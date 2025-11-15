import { ShoppingCart, Heart, Star } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, onBuyNow }) => {
  return (
    <div className="product-card">
      {product.badge && (
        <div className="product-badge">
          <span className="badge">{product.badge}</span>
        </div>
      )}

      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>

        {product.brand && (
          <p className="product-brand">{product.brand}</p>
        )}

        <div className="product-rating">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={16}
              fill={index < Math.floor(product.rating || 0) ? '#fbbf24' : 'none'}
              color="#fbbf24"
            />
          ))}
          <span className="rating-text">({product.reviews || 0})</span>
        </div>

        <div className="product-price">
          <span className="current-price">{product.price} ₼</span>
          {product.originalPrice && (
            <span className="original-price">{product.originalPrice} ₼</span>
          )}
          {product.discount && (
            <span className="discount">-{product.discount}%</span>
          )}
        </div>

        <div className="product-actions">
          <button
            className="btn-buy-now"
            onClick={() => onBuyNow && onBuyNow(product)}
          >
            Əlavə et
          </button>
  
          <button className="btn-icon" title="Sevimlilərə əlavə et">
            <Heart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
