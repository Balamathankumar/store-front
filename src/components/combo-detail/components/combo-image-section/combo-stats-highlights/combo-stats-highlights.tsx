import React from 'react';
import { Product, ComboItem } from '../../../../../types';

interface Props {
  combo: Product & {
    items?: ComboItem[];
    rating?: number;
    reviews?: number;
    totalCost?: number;
    retailPrice?: number;
  };
}

const ComboStatsHighlights: React.FC<Props> = ({ combo }) => {
  const totalSavings = combo.totalCost
    ? combo.retailPrice! - combo.totalCost
    : 0;

  return (
    <>
      {/* Combo Stats */}
      <div className='combo-stats-enhanced'>
        <div className='stat-item-enhanced'>
          <div className='stat-icon'>📦</div>
          <div className='stat-content'>
            <div className='stat-value'>{combo.items?.length || 0}</div>
            <div className='stat-label'>Items Included</div>
          </div>
        </div>

        <div className='stat-item-enhanced'>
          <div className='stat-icon'>⚖️</div>
          <div className='stat-content'>
            <div className='stat-value'>
              {combo.items?.reduce(
                (sum, item) => sum + item.quantityInGrams,
                0
              ) || 0}
              g
            </div>
            <div className='stat-label'>Total Weight</div>
          </div>
        </div>

        {combo.rating && (
          <div className='stat-item-enhanced'>
            <div className='stat-icon'>⭐</div>
            <div className='stat-content'>
              <div className='stat-value'>{combo.rating}</div>
              <div className='stat-label'>{combo.reviews || 0} Reviews</div>
            </div>
          </div>
        )}

        <div className='stat-item-enhanced'>
          <div className='stat-icon'>💰</div>
          <div className='stat-content'>
            <div className='stat-value'>
              {combo.totalCost
                ? Math.round((totalSavings / combo.totalCost) * 100)
                : 0}
              %
            </div>
            <div className='stat-label'>Savings</div>
          </div>
        </div>
      </div>

      {/* Combo Highlights */}
      <div className='combo-highlights'>
        <div className='highlight-item'>
          <span className='highlight-icon'>🌿</span>
          <span className='highlight-text'>Premium Quality</span>
        </div>
        <div className='highlight-item'>
          <span className='highlight-icon'>🎁</span>
          <span className='highlight-text'>Value Pack</span>
        </div>
        <div className='highlight-item'>
          <span className='highlight-icon'>🚚</span>
          <span className='highlight-text'>Free Shipping</span>
        </div>
      </div>
    </>
  );
};

export default ComboStatsHighlights;
