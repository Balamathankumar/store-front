import React from 'react';
import { Product, WeightOption } from '../../../../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  combo: Product;
  product: Product;
  selectedWeight: WeightOption;
  addToCart: (
    product: Product,
    weight: WeightOption,
    quantity: number,
    setQuantity: (q: number) => void,
    getItemPrice: (p: Product, w: WeightOption) => number
  ) => void;
  quantity: number;
  isAdding: boolean;
  setIsAdding: (b: boolean) => void;
  setQuantity: (q: number) => void;
  getItemPrice: (p: Product, w: WeightOption) => number;
}

const ComboActions: React.FC<Props> = ({
  combo,
  addToCart,
  quantity,
  setQuantity,
  getItemPrice,
  isAdding,
  setIsAdding,
  product,
  selectedWeight,
}) => {
  const handleAddToCart = () => {
    addToCart(combo, selectedWeight, quantity, setQuantity, getItemPrice);
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const navigate = useNavigate();
  const currentPrice = getItemPrice(combo, selectedWeight);

  return (
    <div className='add-to-cart-section-enhanced'>
      <div className='quantity-selector-combo'>
        <label className='quantity-label'>Quantity:</label>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            justifyContent: 'space-between',
          }}
        >
          <div className='quantity-controls'>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className='quantity-btn'
              disabled={quantity <= 1}
            >
              −
            </button>
            <span className='quantity-value'>{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className='quantity-btn'
            >
              +
            </button>
          </div>
          <div className='quantity-total'>
            Total: ₹{currentPrice * quantity}
          </div>
        </div>
      </div>

      <div className='action-buttons-section'>
        <button
          onClick={handleAddToCart}
          className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
          disabled={isAdding}
        >
          {isAdding ? '✓ Added to Cart' : '🛒 Add to Cart'}
        </button>

        <button
          onClick={() => {
            addToCart(
              combo,
              selectedWeight,
              quantity,
              setQuantity,
              getItemPrice
            );
            navigate('/checkout');
          }}
          className='buy-now-btn'
        >
          ⚡ Buy Now
        </button>
      </div>

      {/* Enhanced Quick Actions */}
      <div className='quick-actions-enhanced'>
        <button className='quick-action-btn-enhanced'>
          <span className='qa-icon'>💝</span>
          <span className='qa-text'>Gift Wrap</span>
          <span className='qa-price'>+₹50</span>
        </button>

        <button className='quick-action-btn-enhanced'>
          <span className='qa-icon'>❤️</span>
          <span className='qa-text'>Wishlist</span>
        </button>

        <button className='quick-action-btn-enhanced'>
          <span className='qa-icon'>📤</span>
          <span className='qa-text'>Share</span>
        </button>
      </div>
    </div>
  );
};

export default ComboActions;
