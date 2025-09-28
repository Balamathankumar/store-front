import React, { useState } from 'react';
import { Product, WeightOption } from '../../../types';
import { useCart } from '../../../context/CartContext';
import ProductImage from './product-image/product-image';
import AddToCartButton from './add-to-cart-button/add-to-cart-button';
import ProductRating from './product-rating/product-rating';
import ProductComboInfo from './product-comboInfo/product-comboInfo';

interface ProductCardProps {
  product: Product;
  onProductClick?: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
}) => {
  const { addToCart, getItemPrice } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(100);
  const [isAdding, setIsAdding] = useState(false);

  const weights: WeightOption[] = [50, 100, 200, 250, 500];
  const currentPrice = getItemPrice(product, selectedWeight);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);

    const weightToUse = product.isCombo ? 100 : selectedWeight;
    addToCart(product, weightToUse as WeightOption, 1);

    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    setSelectedWeight(parseInt(e.target.value) as WeightOption);
  };

  const handleCardClick = () => {
    if (onProductClick) onProductClick(product.id);
  };

  return (
    <div
      className={`product-card ${
        product.isCombo ? 'combo-product-card' : ''
      } fade-in`}
      onClick={handleCardClick}
    >
      <div className='product-image-wrapper' style={{ position: 'relative' }}>
        <ProductImage
          product={product}
          className='product-image'
          style={{ height: '140px' }}
        />
        {product.badge && <div className='product-badge'>{product.badge}</div>}
        {product.isCombo && <div className='combo-indicator'>🎁 COMBO</div>}
      </div>

      <div className='product-info'>
        <div className='product-content'>
          <div className='product-name'>{product.name}</div>
          <div className='product-description'>{product.description}</div>

          {product.isCombo ? (
            <ProductComboInfo product={product} />
          ) : (
            <>
              <div className='product-price'>
                ₹{currentPrice}
                {product.originalPrice && (
                  <span
                    style={{
                      textDecoration: 'line-through',
                      color: '#999',
                      fontSize: '14px',
                      marginLeft: '8px',
                    }}
                  >
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
              <div className='weight-selector'>
                <select
                  className='weight-dropdown'
                  value={selectedWeight}
                  onChange={handleWeightChange}
                  onClick={(e) => e.stopPropagation()}
                >
                  {weights.map((weight) => (
                    <option key={weight} value={weight}>
                      {weight}g - ₹{getItemPrice(product, weight)}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>

        <div className='product-actions'>
          {/* <ProductRating rating={product.rating} reviews={product.reviews} /> */}
          <AddToCartButton
            product={product}
            isAdding={isAdding}
            onClick={handleAddToCart}
            // selectedWeight={selectedWeight}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
