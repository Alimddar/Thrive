import React from 'react';
import ProductCard from './ProductCard';
import { Grid, List, TrendingUp, TrendingDown } from 'lucide-react';

const ProductGrid = ({ products, onAddToCart, onBuyNow, viewMode, setViewMode }) => {
  const [sortBy, setSortBy] = React.useState('popular');

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'rate-asc':
        return parseFloat(a.rate) - parseFloat(b.rate);
      case 'rate-desc':
        return parseFloat(b.rate) - parseFloat(a.rate);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="product-grid-container">
      <div className="grid-header">
        <div className="results-info">
          <h2>Məhsullar</h2>
          <span className="results-count">{products.length} nəticə tapıldı</span>
        </div>
        
      </div>

      {sortedProducts.length > 0 ? (
        <div className={`product-grid ${viewMode}`}>
          {sortedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>Axtarışınıza uyğun məhsul tapılmadı</p>
          <button onClick={() => window.location.reload()}>Filterləri sıfırla</button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
