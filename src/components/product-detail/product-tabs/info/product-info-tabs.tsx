import React from 'react';
import { Product } from '../../../../types';

interface Props {
  product: Product;
}

const ProductInfoTabs: React.FC<Props> = ({ product }) => (
  <div className='product-info-tabs' style={{ margin: '0 0 20px 0' }}>
    <div className='tabs-container'>
      <div className='tab-headers'>
        <button className='tab-header active'>Details</button>
        <button className='tab-header'>Specifications</button>
        <button className='tab-header'>Delivery</button>
        <button className='tab-header'>Reviews</button>
      </div>

      <div className='tab-content'>
        <div className='tab-panel active'>
          <div className='detail-items'>
            <div className='detail-item'>
              <span className='detail-label'>Category:</span>
              <span className='detail-value'>
                {product.category.replace('_', ' ')}
              </span>
            </div>
            <div className='detail-item'>
              <span className='detail-label'>Brand:</span>
              <span className='detail-value'>
                {product.supplier?.name || 'SpiceVault'}
              </span>
            </div>
            <div className='detail-item'>
              <span className='detail-label'>Shelf Life:</span>
              <span className='detail-value'>12 months from manufacturing</span>
            </div>
            <div className='detail-item'>
              <span className='detail-label'>Storage:</span>
              <span className='detail-value'>
                Store in cool, dry place away from sunlight
              </span>
            </div>
            <div className='detail-item'>
              <span className='detail-label'>Origin:</span>
              <span className='detail-value'>
                Sourced from premium farms in India
              </span>
            </div>
            <div className='detail-item'>
              <span className='detail-label'>Processing:</span>
              <span className='detail-value'>
                Naturally processed without artificial preservatives
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductInfoTabs;
