import React from 'react';
import { Product } from '../../../../types';

interface ProductComboInfoProps {
  product: Product;
}

const ProductComboInfo: React.FC<ProductComboInfoProps> = ({ product }) => {
  if (!product.isCombo) return null;

  return (
    <div className='combo-info'>
      <div className='combo-summary'>
        <div className='combo-header'>
          <span className='combo-badge'>
            🎁 {product.items?.length || 0} Items
          </span>
          <span className='total-weight'>
            {product.items?.reduce(
              (total, item) => total + item.quantityInGrams,
              0
            )}
            g
          </span>
        </div>
        <div className='combo-items-compact'>
          {product.items?.slice(0, 3).map((comboItem, index) => (
            <span key={index} className='combo-item-compact'>
              {comboItem.quantityInGrams}g {comboItem.item.name}
            </span>
          ))}
          {product.items && product.items.length > 3 && (
            <span className='more-items'>+{product.items.length - 3} more</span>
          )}
        </div>
      </div>

      <div className='combo-pricing'>
        <div className='combo-price-main'>
          <span className='current-price'>
            ₹{product.price || product.retailPrice}
          </span>
          {product.totalCost &&
            product.totalCost > (product.price || product.retailPrice) && (
              <>
                <span className='original-price'>
                  ₹{Math.round(product.totalCost)}
                </span>
                <span className='savings-badge'>
                  Save ₹
                  {Math.round(
                    product.totalCost - (product.price || product.retailPrice)
                  )}
                </span>
              </>
            )}
        </div>

        {product.totalCost &&
          product.totalCost > (product.price || product.retailPrice) && (
            <div className='combo-savings-percent'>
              {Math.round(
                ((product.totalCost - (product.price || product.retailPrice)) /
                  product.totalCost) *
                  100
              )}
              % OFF
            </div>
          )}
      </div>
    </div>
  );
};

export default ProductComboInfo;
