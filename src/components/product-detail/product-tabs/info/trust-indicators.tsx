import React from 'react';

const TrustIndicators: React.FC = () => (
  <div className='trust-indicators' style={{ margin: '0 0 20px 0' }}>
    <div className='trust-item'>
      <span className='trust-icon'>🔒</span>
      <span className='trust-text'>Secure Payment</span>
    </div>
    <div className='trust-item'>
      <span className='trust-icon'>🚚</span>
      <span className='trust-text'>Fast Delivery</span>
    </div>
    <div className='trust-item'>
      <span className='trust-icon'>↩️</span>
      <span className='trust-text'>Easy Returns</span>
    </div>
    <div className='trust-item'>
      <span className='trust-icon'>✅</span>
      <span className='trust-text'>Quality Assured</span>
    </div>
  </div>
);

export default TrustIndicators;
