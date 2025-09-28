import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { Product, WeightOption } from '../../../types';

interface Props {
  product: Product;
  selectedWeight: WeightOption;
  quantity: number;
  isAdding: boolean;
  setIsAdding: (b: boolean) => void;
}

const ProductActions: React.FC<Props> = ({
  product,
  selectedWeight,
  quantity,
  isAdding,
  setIsAdding,
}) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
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
          addToCart(product, selectedWeight, quantity);
          navigate('/checkout');
        }}
        className='buy-now-btn'
      >
        ⚡ Buy Now
      </button>
    </div>
  );
};

export default ProductActions;
