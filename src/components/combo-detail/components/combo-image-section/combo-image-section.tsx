import React from 'react';
import ProductImage from '../../../ProductImage';
import { Product } from '../../../../types';
import ComboStatsHighlights from './combo-stats-highlights/combo-stats-highlights';

interface Props {
  combo: Product;
  totalSavings: number;
}

const ComboImageSection: React.FC<Props> = ({ combo }) => {
  return (
    <div className='combo-image-section'>
      <div className='combo-image-container' style={{ position: 'relative' }}>
        <ProductImage
          product={combo}
          className='combo-image-enhanced'
          style={{
            width: '100%',
            height: '350px',
            borderRadius: '24px',
            fontSize: '140px',
          }}
        />

        {combo.badge && (
          <div
            className='combo-badge-enhanced'
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              zIndex: 10,
            }}
          >
            {combo.badge}
          </div>
        )}

        {/* Wishlist button for combo */}
        <button
          className='combo-wishlist-btn'
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            zIndex: 10,
          }}
        >
          ❤️
        </button>
      </div>
      <ComboStatsHighlights combo={combo} />
    </div>
  );
};

export default ComboImageSection;
