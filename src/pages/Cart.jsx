import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Search, TrendingDown, CheckCircle } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';
import { addOrderToHistory } from '../utils/orderHistory';
import Loading from '../components/Loading';
import api from '../services/api';

const Cart = ({ cart, setCart, discountActive, purchaseHistory, setPurchaseHistory, orderHistory, setOrderHistory }) => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [products] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Check if there are cart items without discount information
  const [isAILoading, setIsAILoading] = useState(false);

  // Fetch discount information for cart items when cart changes
  useEffect(() => {
    if (cart.length === 0) {
      setIsAILoading(false);
      return;
    }

    // Find cart items that are missing discount info in purchaseHistory
    const itemsMissingDiscountInfo = cart.filter(item => !purchaseHistory[item.id]);

    if (itemsMissingDiscountInfo.length > 0) {
      // Show loading screen while AI calculates discounts
      setIsAILoading(true);

      // Fetch discount info for all missing items
      const fetchDiscountInfo = async () => {
        try {
          // Call API for each product that doesn't have discount info
          const promises = itemsMissingDiscountInfo.map(async (item) => {
            try {
              const response = await api.purchaseProduct('user_12345', item.id);
              return { productId: item.id, data: response };
            } catch (error) {
              console.error(`Error fetching discount for product ${item.id}:`, error);
              return { productId: item.id, data: null };
            }
          });

          // Wait for all API calls to complete
          const results = await Promise.all(promises);

          // Update purchaseHistory with all the fetched data
          const newPurchaseHistory = { ...purchaseHistory };
          results.forEach(result => {
            if (result.data) {
              newPurchaseHistory[result.productId] = result.data;
            }
          });

          // Update the purchaseHistory state (this will be saved to localStorage via App.jsx)
          setPurchaseHistory(newPurchaseHistory);

          console.log('All discount information fetched successfully');
        } catch (error) {
          console.error('Error fetching discount information:', error);
        } finally {
          // Hide loading screen after all API calls complete
          setIsAILoading(false);
        }
      };

      fetchDiscountInfo();
    } else {
      setIsAILoading(false);
    }
  }, [cart.length]); // Only trigger when cart length changes (new items added)

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory]);

  const filterProducts = () => {
    // Always show 2 specific products: one with discount (iPhone), one without discount (MacBook)
    const productWithDiscount = products.find(p => p.id === 1); // iPhone 15 Pro Max with 11% discount
    const productWithoutDiscount = products.find(p => p.id === 4); // MacBook Pro 16" without discount

    const result = [];
    if (productWithDiscount) result.push(productWithDiscount);
    if (productWithoutDiscount) result.push(productWithoutDiscount);

    setFilteredProducts(result);
  };

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleQuantityChange = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = (item.quantity || 1) + change;
        if (newQuantity > 0) {
          return { ...item, quantity: newQuantity };
        }
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const quantity = item.quantity || 1;
      const purchaseData = purchaseHistory?.[item.id];

      // Get price from purchaseHistory if available
      let price = item.price;
      if (discountActive && purchaseData?.original_data?.discount_applied) {
        price = purchaseData.original_data.offer_details.final_price;
      } else if (purchaseData?.original_data?.original_price) {
        price = purchaseData.original_data.original_price;
      }

      return total + (price * quantity);
    }, 0);
  };

  const calculateItemCount = () => {
    return cart.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  // Calculate totals for AI section based on cart and purchaseHistory
  const calculateAITotals = () => {
    let originalTotal = 0;
    let discountedTotal = 0;
    let totalDiscount = 0;

    cart.forEach(product => {
      const quantity = product.quantity || 1;
      const purchaseData = purchaseHistory?.[product.id];

      // Get original price from purchase data or product
      const original = purchaseData?.original_data?.original_price || product.price;
      originalTotal += original * quantity;

      // Check if there's a discount from API
      if (discountActive && purchaseData?.original_data?.discount_applied) {
        const offerDetails = purchaseData.original_data.offer_details;
        const finalPrice = offerDetails.final_price;
        discountedTotal += finalPrice * quantity;
        totalDiscount += offerDetails.discount_amount * quantity;
      } else {
        discountedTotal += original * quantity;
      }
    });

    return {
      originalTotal: Math.round(originalTotal * 100) / 100,
      discountedTotal: Math.round(discountedTotal * 100) / 100,
      totalDiscount: Math.round(totalDiscount * 100) / 100,
      discountPercentage: originalTotal > 0 ? Math.round((totalDiscount / originalTotal) * 100) : 0
    };
  };

  const totals = calculateAITotals();

  // AI Analysis based on cart products and purchaseHistory
  const getAIAnalysis = () => {
    if (cart.length === 0) {
      return {
        title: 'AI Discount Analizi',
        insights: [
          {
            icon: '🛒',
            text: 'Səbətiniz boşdur. Məhsul əlavə edin və AI analizi alın.',
            type: 'info'
          }
        ]
      };
    }

    const insights = [];

    // If discount is not active, show activation message
    if (!discountActive) {
      insights.push({
        icon: '⚠️',
        text: 'Endirim funksiyası deaktivdir. Profil səhifəsindən endirimi aktivləşdirə bilərsiniz.',
        type: 'warning'
      });
    } else {
      // Use purchaseHistory to determine which products have discounts
      const productsWithDiscount = cart.filter(p => {
        const purchaseData = purchaseHistory?.[p.id];
        return purchaseData?.original_data?.discount_applied;
      });

      const productsWithoutDiscount = cart.filter(p => {
        const purchaseData = purchaseHistory?.[p.id];
        return !purchaseData?.original_data?.discount_applied;
      });

      // Add insights for products with discounts from API
      productsWithDiscount.forEach(product => {
        const purchaseData = purchaseHistory[product.id];
        const offerDetails = purchaseData.original_data.offer_details;
        insights.push({
          icon: '🎯',
          text: `${product.name}-da AI analizi əsasən ${offerDetails.discount_percentage}% endirim tətbiq edildi (${offerDetails.offer_name})`,
          type: 'success'
        });
      });

      // Add insights for products without discounts
      productsWithoutDiscount.forEach(product => {
        insights.push({
          icon: '💡',
          text: `${product.name} üçün hazırda aktiv endirim təklifi yoxdur`,
          type: 'info'
        });
      });

      // Add total savings if there are discounts
      if (totals.discountPercentage > 0) {
        insights.push({
          icon: '📊',
          text: `Ümumi ${totals.discountPercentage}% qənaət əldə edildi`,
          type: 'primary'
        });
      }

      // Add AI strategy insight
      insights.push({
        icon: '🤖',
        text: 'AI sistemi müştəri profilinə və alış-veriş tarixçəsinə əsaslanaraq optimal endirim təklifləri təyin etdi',
        type: 'ai'
      });
    }

    return {
      title: 'AI Discount Analizi',
      insights
    };
  };

  const aiAnalysis = getAIAnalysis();

  // Handle checkout - complete the order
  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Add current cart to order history
    const updatedHistory = addOrderToHistory(orderHistory, cart, purchaseHistory, discountActive);
    setOrderHistory(updatedHistory);

    // Clear the cart
    setCart([]);

    // Show success modal
    setShowSuccessModal(true);

    // Auto close modal and redirect to products page after 1.5 seconds
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate('/products');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="main-content">
        <div className="cart-empty">
          <ShoppingBag size={80} color="#9ca3af" />
          <h2>Səbətiniz boşdur</h2>
          <p>Məhsul əlavə etmək üçün məhsullar səhifəsinə keçin</p>
        </div>
      </div>
    );
  }

  // Show full-page loading screen while AI calculates discounts
  if (isAILoading) {
    return <Loading title="AI Endirim Hesablanır..." subtitle="Sizin üçün ən yaxşı endirimləri tapırıq" />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Səbətim və AI Analizi</h1>
        <p className="dashboard-subtitle">Səbət məlumatları və məhsul analizi</p>
      </div>

      {/* Discount Warning Banner */}
      {!discountActive && (
        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          border: '1px solid #f59e0b',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '24px' }}>⚠️</span>
          <div>
            <p style={{ margin: 0, fontSize: '14px', color: '#92400e', fontWeight: '600' }}>
              Endirim funksiyası deaktivdir
            </p>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#78350f' }}>
              Profil səhifəsindən endirim funksiyasını aktivləşdirərək məhsullarda endirimdən faydalana bilərsiniz.
            </p>
          </div>
        </div>
      )}

      <div className="dashboard-content-wrapper">
        {/* Left Side - Cart Items */}
        <div className="dashboard-main-content">
          {/* Cart Section */}
          <div className="cart-items" style={{ background: 'white', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
            <h2 className="cart-title">Səbətim ({calculateItemCount()} məhsul)</h2>

            {cart.map((item) => {
              const quantity = item.quantity || 1;
              const purchaseData = purchaseHistory?.[item.id];

              // Get price from purchaseHistory if available
              let displayPrice = item.price;
              if (discountActive && purchaseData?.original_data?.discount_applied) {
                displayPrice = purchaseData.original_data.offer_details.final_price;
              } else if (purchaseData?.original_data?.original_price) {
                displayPrice = purchaseData.original_data.original_price;
              }

              return (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    {item.brand && (
                      <p className="cart-item-brand">{item.brand}</p>
                    )}
                    {discountActive && purchaseData?.original_data?.discount_applied && (
                      <span style={{
                        fontSize: '12px',
                        color: '#10b981',
                        fontWeight: '600',
                        display: 'block',
                        marginTop: '4px'
                      }}>
                        ✓ {purchaseData.original_data.offer_details.discount_percentage}% endirim tətbiq edildi
                      </span>
                    )}
                  </div>

                  <div className="cart-item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="quantity-value">{quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="cart-item-price">
                    <span className="item-price">{displayPrice.toFixed(2)} ₼</span>
                    {quantity > 1 && (
                      <span className="item-total">
                        Cəmi: {(displayPrice * quantity).toFixed(2)} ₼
                      </span>
                    )}
                  </div>

                  <button
                    className="cart-item-remove"
                    onClick={() => handleRemoveFromCart(item.id)}
                    title="Sil"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* AI Products Section */}
       
          {/* Products Table */}
    
          {filteredProducts.length === 0 && (
            <div className="coming-soon">
              <p>Heç bir məhsul tapılmadı</p>
            </div>
          )}
        </div>

        {/* Right Side - AI Analysis & Cart Summary */}
        <div className="dashboard-sidebar-payment">
          {/* AI Analysis Card */}
          <div className="ai-analysis-card">
            {isAILoading ? (
              <div className="ai-loading">
                <div className="ai-spinner"></div>
                <h3 className="ai-loading-title">AI Endirim Hesablaması</h3>
                <p className="ai-loading-text">AI endirim hesablamasını edir...</p>
              </div>
            ) : (
              <div className="ai-content">
                <h3 className="ai-title">{aiAnalysis.title}</h3>

                <div className="ai-insights">
                  {aiAnalysis.insights.map((insight, index) => (
                    <div key={index} className={`ai-insight ${insight.type}`}>
                      <span className="insight-icon">{insight.icon}</span>
                      <p className="insight-text">{insight.text}</p>
                    </div>
                  ))}
                </div>

                <div className="ai-footer">
                  <p className="ai-disclaimer">
                    💡 AI sistemi optimal qiymət və endirim strategiyasını müəyyən edir.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* AI Payment Summary for cart products */}
          {!isAILoading && cart.length > 0 && (
            <div className="payment-summary-card">
              <h3 className="payment-title">AI Analiz Məlumatı</h3>

              <div className="payment-details">
                {cart.map((product, index) => {
                  const quantity = product.quantity || 1;
                  const purchaseData = purchaseHistory?.[product.id];

                  // Get prices from purchaseHistory
                  const originalPrice = purchaseData?.original_data?.original_price || product.price;
                  let currentPrice = originalPrice;
                  let discountAmount = 0;
                  let hasDiscount = false;
                  let discountPercentage = 0;

                  if (discountActive && purchaseData?.original_data?.discount_applied) {
                    const offerDetails = purchaseData.original_data.offer_details;
                    if (offerDetails && offerDetails.final_price !== undefined && offerDetails.final_price > 0) {
                      currentPrice = offerDetails.final_price;
                      discountAmount = offerDetails.discount_amount || (originalPrice - offerDetails.final_price);
                      discountPercentage = offerDetails.discount_percentage || Math.round(((originalPrice - offerDetails.final_price) / originalPrice) * 100);
                      hasDiscount = true;
                    }
                  }

                  const itemTotal = currentPrice * quantity;

                  return (
                    <div key={product.id} style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #e5e7eb' }}>
                      <div className="payment-product-row" style={{ marginBottom: '8px' }}>
                        <span className="payment-product-name">{index + 1}. {product.name}</span>
                        <span className="payment-product-price">{currentPrice.toFixed(2)} ₼</span>
                      </div>

                      {hasDiscount ? (
                        <>
                          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px' }}>
                            <span>Orijinal qiymət ({quantity}x):</span>
                            <span style={{ textDecoration: 'line-through' }}>{(originalPrice * quantity).toFixed(2)} ₼</span>
                          </div>
                          <div style={{ fontSize: '12px', color: '#10b981', fontWeight: '600', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px', marginBottom: '4px' }}>
                            <span>AI Endirim ({discountPercentage}%):</span>
                            <span>-{(discountAmount * quantity).toFixed(2)} ₼</span>
                          </div>
                          <div style={{ fontSize: '13px', color: '#1f2937', fontWeight: '700', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px' }}>
                            <span>Yekun ({quantity}x):</span>
                            <span style={{ color: '#10b981' }}>{itemTotal.toFixed(2)} ₼</span>
                          </div>
                        </>
                      ) : (
                        <>
                          {!discountActive && purchaseData?.original_data ? (
                            <div style={{ fontSize: '12px', color: '#f59e0b', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px', marginBottom: '4px' }}>
                              <span>⚠️ Endirim deaktivdir</span>
                            </div>
                          ) : (
                            <div style={{ fontSize: '12px', color: '#6b7280', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px', marginBottom: '4px' }}>
                              <span>Hazırda aktiv endirim təklifi yoxdur</span>
                            </div>
                          )}
                          <div style={{ fontSize: '13px', color: '#1f2937', fontWeight: '700', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px' }}>
                            <span>Yekun ({quantity}x):</span>
                            <span style={{ color: '#10b981' }}>{itemTotal.toFixed(2)} ₼</span>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="payment-divider"></div>

              <div className="payment-totals">
                {totals.totalDiscount > 0 && (
                  <>
                    <div className="payment-row" style={{ color: '#6b7280', fontSize: '14px' }}>
                      <span className="payment-label">Orijinal Məbləğ:</span>
                      <span className="payment-value" style={{ textDecoration: 'line-through' }}>{totals.originalTotal.toFixed(2)} ₼</span>
                    </div>
                    <div className="payment-row" style={{ color: '#10b981', fontSize: '14px', fontWeight: '600' }}>
                      <span className="payment-label">Ümumi AI Endirim:</span>
                      <span className="payment-value">-{totals.totalDiscount.toFixed(2)} ₼</span>
                    </div>
                  </>
                )}

                <div className="payment-row">
                  <span className="payment-label">Məhsullar ({calculateItemCount()}):</span>
                  <span className="payment-value">{calculateTotal().toFixed(2)} ₼</span>
                </div>

                <div className="payment-row">
                  <span className="payment-label">Çatdırılma:</span>
                  <span className="payment-value" style={{ color: '#10b981', fontWeight: '700' }}>Pulsuz</span>
                </div>

                <div className="payment-divider"></div>

                <div className="payment-row final-row">
                  <span className="payment-label final">Yekun Məbləğ:</span>
                  <span className="payment-value final">{calculateTotal().toFixed(2)} ₼</span>
                </div>

                {totals.totalDiscount > 0 && (
                  <div style={{
                    marginTop: '15px',
                    padding: '12px',
                    background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '14px', color: '#065f46', fontWeight: '700', margin: 0 }}>
                      🎉 Siz {totals.totalDiscount.toFixed(2)} ₼ ({totals.discountPercentage}%) qənaət etdiniz!
                    </p>
                  </div>
                )}
              </div>

              <button className="payment-btn" onClick={handleCheckout}>
                Sifarişi tamamla
              </button>

              <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', marginTop: '15px' }}>
                * Bütün qiymətlərə ƏDV daxildir
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px',
            maxWidth: '400px',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            animation: 'slideIn 0.3s ease-out'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 20px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle size={48} color="white" />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '12px' }}>
              Ödənildi!
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '8px' }}>
              Sifarişiniz uğurla tamamlandı.
            </p>
            <p style={{ fontSize: '14px', color: '#9ca3af' }}>
              Məhsullar səhifəsinə yönləndirilirsiniz...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
