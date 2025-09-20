import React, { useState } from 'react';
import { Product, WeightOption } from '../types';
import { useCart } from '../context/CartContext';
import ProductImage from './ProductImage';

interface ProductCardProps {
  product: Product;
  onProductClick?: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const { addToCart, getItemPrice } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(100);
  const [isAdding, setIsAdding] = useState(false);

  const weights: WeightOption[] = [50, 100, 200, 250, 500];

  const currentPrice = getItemPrice(product, selectedWeight);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    
    // For combo products, use a default weight (e.g., 100g) since weight doesn't matter
    const weightToUse = product.isCombo ? 100 : selectedWeight;
    addToCart(product, weightToUse as WeightOption, 1);
    
    // Show feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    setSelectedWeight(parseInt(e.target.value) as WeightOption);
  };

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product.id);
    }
  };

  // Generate emoji based on category if not provided
  const getProductEmoji = (product: Product): string => {
    if (product.emoji) return product.emoji;
    
    switch (product.category) {
      case 'NUT': return '🥜';
      case 'SPICE': return '🌶️';
      case 'DRY FRUIT': return '🍇';
      case 'SEEDS': return '🌱';
      default: return '🏷️';
    }
  };

  const renderStars = (rating: number = 4.5) => {
    return '⭐'.repeat(Math.round(rating));
  };

  return (
    <div className={`product-card ${product.isCombo ? 'combo-product-card' : ''} fade-in`} onClick={handleCardClick}>
      <div className="product-image-wrapper" style={{ position: 'relative' }}>
        <ProductImage 
          product={product}
          className="product-image"
          style={{ height: '140px' }}
        />
        {product.badge && <div className="product-badge">{product.badge}</div>}
        {product.isCombo && <div className="combo-indicator">🎁 COMBO</div>}
      </div>
      <div className="product-info">
        <div className="product-content">
          <div className="product-name">{product.name}</div>
          <div className="product-description">{product.description}</div>
          
          {product.isCombo ? (
            // Compact combo products display
            <div className="combo-info">
              <div className="combo-summary">
                <div className="combo-header">
                  <span className="combo-badge">🎁 {product.items?.length || 0} Items</span>
                  <span className="total-weight">
                    {product.items?.reduce((total, item) => total + item.quantityInGrams, 0)}g
                  </span>
                </div>
                <div className="combo-items-compact">
                  {product.items?.slice(0, 3).map((comboItem, index) => (
                    <span key={index} className="combo-item-compact">
                      {comboItem.quantityInGrams}g {comboItem.item.name}
                    </span>
                  ))}
                  {product.items && product.items.length > 3 && (
                    <span className="more-items">+{product.items.length - 3} more</span>
                  )}
                </div>
              </div>
              
              <div className="combo-pricing">
                <div className="combo-price-main">
                  <span className="current-price">₹{product.price || product.retailPrice}</span>
                  {product.totalCost && product.totalCost > (product.price || product.retailPrice) && (
                    <>
                      <span className="original-price">₹{Math.round(product.totalCost)}</span>
                      <span className="savings-badge">
                        Save ₹{Math.round(product.totalCost - (product.price || product.retailPrice))}
                      </span>
                    </>
                  )}
                </div>
                {product.totalCost && product.totalCost > (product.price || product.retailPrice) && (
                  <div className="combo-savings-percent">
                    {Math.round(((product.totalCost - (product.price || product.retailPrice)) / product.totalCost) * 100)}% OFF
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Regular products: Show weight selector
            <div className="weight-selector">
              <select 
                className="weight-dropdown" 
                value={selectedWeight}
                onChange={handleWeightChange}
                onClick={(e) => e.stopPropagation()}
              >
                {weights.map(weight => (
                  <option key={weight} value={weight}>
                    {weight}g - ₹{getItemPrice(product, weight)}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {!product.isCombo && (
            <div className="product-price">
              ₹{currentPrice}
              {product.originalPrice && (
                <span style={{ 
                  textDecoration: 'line-through', 
                  color: '#999', 
                  fontSize: '14px', 
                  marginLeft: '8px' 
                }}>
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="product-actions">
          <div className="product-rating">
            <div className="stars">{renderStars(product.rating)}</div>
            <div className="rating-text">
              {product.rating || 4.5} ({product.reviews || 0})
            </div>
          </div>
          
          <button 
            className={`add-to-cart ${product.isCombo ? 'combo-add-to-cart' : ''}`}
            onClick={handleAddToCart}
            style={{
              background: isAdding ? '#27ae60' : undefined
            }}
          >
            {isAdding ? (product.isCombo ? '🎁 Added!' : 'Added!') : (product.isCombo ? '🎁 Add Combo' : 'Add to Cart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
