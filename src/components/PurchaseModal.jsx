import { Check, Gift, TrendingDown, DollarSign, X } from 'lucide-react';

const PurchaseModal = ({ isOpen, onClose, purchaseData }) => {
  if (!isOpen || !purchaseData) return null;

  const { original_data, summary } = purchaseData;
  const { product, offer_details, all_applicable_offers } = original_data || {};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content purchase-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Success Header */}
        <div className="purchase-success-header">
          <div className="success-icon">
            <Check size={40} color="white" />
          </div>
          <h2>Sifariş Uğurla Tamamlandı!</h2>
        </div>

        {/* Product Info */}
        {product && (
          <div className="purchase-product-info">
            <img src={product.image} alt={product.name} />
            <div>
              <h3>{product.name}</h3>
              <p className="product-brand">{product.brand}</p>
              <p className="product-desc">{product.description}</p>
            </div>
          </div>
        )}

        {/* AI Summary */}
        {summary && (
          <div className="ai-summary-section">
            <h4>📝 AI Analiz Xülasəsi</h4>
            <div className="ai-summary-content">
              {summary.split('\n').map((line, idx) => {
                // Convert markdown bold (**text**) to <strong> tags
                const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                return (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: formattedLine }} />
                );
              })}
            </div>
          </div>
        )}

        {/* Applied Discount Details */}
        {offer_details && (
          <div className="discount-details-section">
            <h4>🎉 Tətbiq Edilən Endirim</h4>
            <div className="offer-card applied">
              <div className="offer-header">
                <Gift size={20} />
                <span className="offer-name">{offer_details.offer_name}</span>
              </div>
              <div className="offer-partner">{offer_details.partner}</div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Orijinal Qiymət:</span>
                  <span className="original-price">{original_data.original_price} ₼</span>
                </div>

                <div className="price-row discount">
                  <span>
                    <TrendingDown size={16} />
                    Endirim ({offer_details.discount_percentage}%):
                  </span>
                  <span className="discount-amount">-{offer_details.discount_amount.toFixed(2)} ₼</span>
                </div>

                {offer_details.cashback_amount > 0 && (
                  <div className="price-row cashback">
                    <span>
                      <DollarSign size={16} />
                      Cashback:
                    </span>
                    <span className="cashback-amount">+{offer_details.cashback_amount} ₼</span>
                  </div>
                )}

                <div className="price-row final">
                  <span>Son Qiymət:</span>
                  <span className="final-price">{offer_details.final_price.toFixed(2)} ₼</span>
                </div>
              </div>

              <div className="savings-badge">
                Qənaətiniz: {offer_details.discount_amount.toFixed(2)} ₼
              </div>
            </div>
          </div>
        )}

        {/* All Applicable Offers */}
        {all_applicable_offers && all_applicable_offers.length > 1 && (
          <div className="all-offers-section">
            <h4>💡 Mövcud Digər Təkliflər</h4>
            <p className="offers-note">Bu məhsul üçün bu təkliflərdən də faydalana bilərdiniz:</p>
            <div className="offers-list">
              {all_applicable_offers
                .filter(offer => offer.offer_id !== offer_details?.offer_id)
                .map((offer, idx) => (
                  <div key={idx} className="offer-card alternative">
                    <div className="offer-header">
                      <Gift size={16} />
                      <span className="offer-name">{offer.offer_name}</span>
                    </div>
                    <div className="offer-details-mini">
                      <span className="offer-type">{offer.discount_type}</span>
                      <span className="offer-discount">{offer.discount_percentage}% endirim</span>
                      {offer.cashback_amount > 0 && (
                        <span className="offer-cashback">+{offer.cashback_amount} ₼ cashback</span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="modal-actions">
          <button className="btn-primary" onClick={onClose}>
            Başa Düşdüm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
