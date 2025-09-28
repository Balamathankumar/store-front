import React from 'react';

const DeliveryInfo: React.FC = () => (
  <div className='delivery-info-section' style={{ margin: '0 0 20px 0' }}>
    <h3 className='section-subtitle'>📦 Delivery Information</h3>
    <div className='delivery-grid'>
      <div className='delivery-item'>
        <div className='delivery-icon'>🚚</div>
        <div className='delivery-content'>
          <div className='delivery-title'>Free Delivery</div>
          <div className='delivery-desc'>On orders over ₹1000</div>
        </div>
      </div>
      <div className='delivery-item'>
        <div className='delivery-icon'>⏰</div>
        <div className='delivery-content'>
          <div className='delivery-title'>Express Delivery</div>
          <div className='delivery-desc'>2-3 business days</div>
        </div>
      </div>
      <div className='delivery-item'>
        <div className='delivery-icon'>💰</div>
        <div className='delivery-content'>
          <div className='delivery-title'>Cash on Delivery</div>
          <div className='delivery-desc'>Available for all orders</div>
        </div>
      </div>
      <div className='delivery-item'>
        <div className='delivery-icon'>🔄</div>
        <div className='delivery-content'>
          <div className='delivery-title'>Easy Returns</div>
          <div className='delivery-desc'>7-day hassle-free returns</div>
        </div>
      </div>
    </div>
  </div>
);

export default DeliveryInfo;
