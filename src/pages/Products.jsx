import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import Loading from '../components/Loading';
import { mockProducts } from '../data/mockProducts';
import { api } from '../services/api';

const Products = ({ cart, setCart, purchaseHistory, setPurchaseHistory }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    terms: [],
    features: []
  });
  const [viewMode, setViewMode] = useState('grid');
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const productsData = await api.getProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error('Failed to fetch products, using mock data:', error);
        // Fallback to mock data if API fails
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter və search logic
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchTerm) {
      result = result.filter(product =>
        product.name?.toLocaleLowerCase('tr-TR').includes(searchTerm.toLocaleLowerCase('tr-TR')) ||
        product.brand?.toLocaleLowerCase('tr-TR').includes(searchTerm.toLocaleLowerCase('tr-TR')) ||
        product.category?.toLocaleLowerCase('tr-TR').includes(searchTerm.toLocaleLowerCase('tr-TR')) ||
        product.description?.toLocaleLowerCase('tr-TR').includes(searchTerm.toLocaleLowerCase('tr-TR'))
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }

    // Price range filter
    if (filters.priceRange) {
      result = result.filter(product => {
        const price = parseFloat(product.price);
        switch (filters.priceRange) {
          case '0-100':
            return price <= 100;
          case '100-500':
            return price > 100 && price <= 500;
          case '500-1000':
            return price > 500 && price <= 1000;
          case '1000-3000':
            return price > 1000 && price <= 3000;
          case '3000+':
            return price > 3000;
          default:
            return true;
        }
      });
    }

    // Brand filter
    if (filters.terms && filters.terms.length > 0) {
      result = result.filter(product =>
        filters.terms.some(term => product.brand?.toLowerCase() === term.toLowerCase())
      );
    }

    // Features filter
    if (filters.features && filters.features.length > 0) {
      result = result.filter(product => {
        if (filters.features.includes('endirim')) {
          return product.discount > 0;
        }
        if (filters.features.includes('yeni')) {
          return product.badge === 'Yeni';
        }
        if (filters.features.includes('populyar')) {
          return product.badge === 'Populyar';
        }
        return true;
      });
    }

    setFilteredProducts(result);
  }, [searchTerm, filters, products]);

  const handleAddToCart = async (product) => {
    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      // If exists, increase quantity
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      ));
    } else {
      // If not exists, add new product with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Call purchase API to get discount information (if not already fetched)
    if (!purchaseHistory[product.id]) {
      try {
        const response = await api.purchaseProduct('user_12345', product.id);

        // Save purchase response to purchaseHistory
        setPurchaseHistory({
          ...purchaseHistory,
          [product.id]: response
        });

        console.log('Discount info fetched for:', product.name);
        if (response.original_data?.offer_details) {
          console.log('Discount:', response.original_data.offer_details);
        }
      } catch (error) {
        console.error('Error fetching discount info:', error);
      }
    }
  };

  const handleBuyNow = async (product) => {
    // Add product to cart (this also fetches discount info)
    await handleAddToCart(product);

    // Log message
    console.log('Product added to cart with discount info:', product.name);
  };

  // Show loading overlay only for products
  if (loadingProducts) {
    return <Loading />;
  }

  return (
    <div className="main-content">
      <FilterSidebar filters={filters} setFilters={setFilters} />

      <div className="content-area">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ProductGrid
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </div>
    </div>
  );
};

export default Products;
