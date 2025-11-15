import { Calendar, ShoppingBag, TrendingDown, Package } from 'lucide-react';
import { calculateOrderStats } from '../utils/orderHistory';

const History = ({ orderHistory = [] }) => {
  // Calculate total statistics from real order history
  const stats = calculateOrderStats(orderHistory);
  const { totalOrders, totalSpent, totalSaved, totalProducts } = stats;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Alış-veriş Tarixçəsi</h1>
        <p className="dashboard-subtitle">Keçmiş sifarişləriniz və qənaət məlumatlarınız</p>
      </div>

      {/* Statistics Cards */}
      <div className="history-stats-grid">
        <div className="history-stat-card">
          <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
            <ShoppingBag size={24} color="white" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Ümumi Sifariş</p>
            <h3 className="stat-value">{totalOrders}</h3>
          </div>
        </div>

        <div className="history-stat-card">
          <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <Package size={24} color="white" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Ümumi Məhsul</p>
            <h3 className="stat-value">{totalProducts}</h3>
          </div>
        </div>

        <div className="history-stat-card">
          <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <Calendar size={24} color="white" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Ümumi Xərc</p>
            <h3 className="stat-value">{totalSpent.toFixed(2)} ₼</h3>
          </div>
        </div>

        <div className="history-stat-card">
          <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <TrendingDown size={24} color="white" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Ümumi Qənaət</p>
            <h3 className="stat-value">{totalSaved.toFixed(2)} ₼</h3>
          </div>
        </div>
      </div>

      {/* Purchase History List */}
      <div className="history-orders-container">
        {orderHistory.map((order) => (
          <div key={order.id} className="history-order-card">
            {/* Order Header */}
            <div className="history-order-header">
              <div className="order-header-left">
                <h3 className="order-id">Sifariş #{order.orderId}</h3>
                <div className="order-date">
                  <Calendar size={16} />
                  <span>{new Date(order.date).toLocaleDateString('az-AZ', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>
              <div className="order-status-badge status-delivered">
                {order.status}
              </div>
            </div>

            {/* Order Products */}
            <div className="history-products-list">
              {order.products.map((product) => (
                <div key={product.id} className="history-product-item">
                  <div className="product-image-wrapper">
                    <img src={product.image} alt={product.name} className="product-image" />
                  </div>

                  <div className="product-details">
                    <h4 className="product-name">{product.name}</h4>
                    <p className="product-brand">{product.brand}</p>
                    <p className="product-quantity">Miqdar: {product.quantity}</p>
                  </div>

                  <div className="product-pricing">
                    {product.discount > 0 ? (
                      <>
                        <div className="price-row">
                          <span className="price-label">Orijinal:</span>
                          <span className="price-original">{product.originalPrice} ₼</span>
                        </div>
                        <div className="price-row">
                          <span className="price-label">Endirim:</span>
                          <span className="price-discount">-{product.discount}%</span>
                        </div>
                        <div className="price-row">
                          <span className="price-label">Ödənildi:</span>
                          <span className="price-paid">{product.discountedPrice} ₼</span>
                        </div>
                      </>
                    ) : (
                      <div className="price-row">
                        <span className="price-label">Qiymət:</span>
                        <span className="price-paid">{product.originalPrice} ₼</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="history-order-summary">
              <div className="summary-row">
                <span className="summary-label">Orijinal Məbləğ:</span>
                <span className="summary-value original">{order.totalOriginal.toFixed(2)} ₼</span>
              </div>
              {order.totalSavings > 0 && (
                <div className="summary-row savings">
                  <span className="summary-label">AI Endirim:</span>
                  <span className="summary-value discount">-{order.totalSavings.toFixed(2)} ₼</span>
                </div>
              )}
              <div style={{ margin: '12px 0', borderTop: '1px solid #e5e7eb' }}></div>
              <div className="summary-row total">
                <span className="summary-label">Ödənilən Məbləğ:</span>
                <span className="summary-value final">{order.totalPaid.toFixed(2)} ₼</span>
              </div>
              {order.totalSavings > 0 && (
                <div className="savings-badge">
                  🎉 {order.totalSavings.toFixed(2)} ₼ qənaət etdiniz!
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {orderHistory.length === 0 && (
        <div className="history-empty">
          <ShoppingBag size={80} color="#9ca3af" />
          <h2>Hələ alış-veriş tarixçəniz yoxdur</h2>
          <p>İlk sifarişinizi vermək üçün məhsullara baxın</p>
        </div>
      )}
    </div>
  );
};

export default History;
