import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import NotFound from './pages/NotFound';
import { loadOrderHistory, saveOrderHistory } from './utils/orderHistory';
import './styles.css';

function App() {
  // Load cart from localStorage on initial render
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Load discount state from localStorage
  const [discountActive, setDiscountActive] = useState(() => {
    const savedDiscount = localStorage.getItem('discountActive');
    return savedDiscount ? JSON.parse(savedDiscount) : false;
  });

  // Store purchase data (from API) for each product
  const [purchaseHistory, setPurchaseHistory] = useState(() => {
    const savedHistory = localStorage.getItem('purchaseHistory');
    return savedHistory ? JSON.parse(savedHistory) : {};
  });

  // Store order history (completed purchases)
  const [orderHistory, setOrderHistory] = useState(() => {
    return loadOrderHistory();
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save discount state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('discountActive', JSON.stringify(discountActive));
  }, [discountActive]);

  // Save purchase history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
  }, [purchaseHistory]);

  // Save order history to localStorage whenever it changes
  useEffect(() => {
    saveOrderHistory(orderHistory);
  }, [orderHistory]);

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {/* Public Routes */}
          <Route path="*" element={
            <>
              <Header cartCount={cart.length} />
              <Routes>
                <Route path="/" element={<Products cart={cart} setCart={setCart} purchaseHistory={purchaseHistory} setPurchaseHistory={setPurchaseHistory} />} />
                <Route path="/products" element={<Products cart={cart} setCart={setCart} purchaseHistory={purchaseHistory} setPurchaseHistory={setPurchaseHistory} />} />
                <Route path="/cart" element={<Cart cart={cart} setCart={setCart} discountActive={discountActive} purchaseHistory={purchaseHistory} setPurchaseHistory={setPurchaseHistory} orderHistory={orderHistory} setOrderHistory={setOrderHistory} />} />
                <Route path="/profile" element={<Profile discountActive={discountActive} setDiscountActive={setDiscountActive} />} />
                <Route path="/dashboard" element={<Dashboard orderHistory={orderHistory} />} />
                <Route path="/history" element={<History orderHistory={orderHistory} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
