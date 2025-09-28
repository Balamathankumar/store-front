import React from 'react';
import { Product, WeightOption } from '../../../types';

interface Props {
  product: Product;
  selectedWeight: WeightOption;
  setSelectedWeight: (w: WeightOption) => void;
  quantity: number;
  setQuantity: (q: number) => void;
  getItemPrice: (p: Product, w: WeightOption) => number;
}

const weights: WeightOption[] = [50, 100, 200, 250, 500];

const ProductInfo: React.FC<Props> = ({
  product,
  selectedWeight,
  setSelectedWeight,
  quantity,
  setQuantity,
  getItemPrice,
}) => {
  const currentPrice = getItemPrice(product, selectedWeight);

  return (
    <div className='product-detail-info'>
      <h1 className='product-title'>{product.name}</h1>
      <p className='product-description'>{product.description}</p>

      {/* Weight selection */}
      <div className='weight-selection-section'>
        <h3 className='section-subtitle'>Select Weight:</h3>
        <div className='weight-options-grid'>
          {weights.map((weight) => (
            <button
              key={weight}
              onClick={() => setSelectedWeight(weight)}
              className={`weight-option ${
                selectedWeight === weight ? 'active' : ''
              }`}
            >
              {weight}g - ₹{getItemPrice(product, weight)}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity selection */}
      <div className='quantity-selection-section'>
        <h3 className='section-subtitle'>Quantity:</h3>
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
        <div className='bulk-discount-note'>
          💡 Buy 3+ items and get 5% extra discount
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
