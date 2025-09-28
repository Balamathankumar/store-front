import React from 'react';
import { Product } from '../../../../types';

interface Props {
  combo: Product;
  totalSavings: number;
}

const ComboDetailsSection: React.FC<Props> = ({ combo, totalSavings }) => {
  return (
    <div>
      <div className='combo-header-enhanced'>
        <div className='combo-category-tag'>Special Combo</div>

        <h1 className='combo-title-enhanced'>{combo.name}</h1>

        {combo.rating && (
          <div className='combo-rating-section'>
            <div className='rating-stars'>
              {Array.from({ length: Math.floor(combo.rating) }).map(
                (_, index) => (
                  <span key={index} style={{ color: '#ffd700' }}>
                    ⭐
                  </span>
                )
              )}
            </div>
            <span className='rating-text'>
              {combo.rating} ({combo.reviews || 0} reviews)
            </span>
          </div>
        )}

        <p className='combo-description-enhanced'>{combo.description}</p>
      </div>
      <div className='price-section-combo'>
        <div className='price-main-combo'>
          <span className='current-price-combo'>
            ₹{combo.price || combo.retailPrice}
          </span>
          {combo.totalCost && (
            <>
              <span className='original-price-combo'>
                ₹{Math.round(combo.totalCost)}
              </span>
              <span className='discount-badge-combo'>
                {Math.round((totalSavings / combo.totalCost) * 100)}% OFF
              </span>
            </>
          )}
        </div>

        {combo.totalCost && (
          <div className='savings-highlight'>
            <span className='savings-text'>
              You save ₹{Math.round(totalSavings)}
            </span>
            <span className='savings-note'>
              compared to buying individually
            </span>
          </div>
        )}

        <div className='price-benefits'>
          <span className='benefit-item'>✓ Free shipping included</span>
          <span className='benefit-item'>✓ Premium quality guaranteed</span>
          <span className='benefit-item'>✓ Ready to cook combination</span>
        </div>
      </div>
    </div>
  );
};

export default ComboDetailsSection;
