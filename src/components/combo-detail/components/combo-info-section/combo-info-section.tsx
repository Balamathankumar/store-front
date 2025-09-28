import React from 'react';

const ComboInfoSection: React.FC = () => {
  return (
    <div className='additional-info-enhanced'>
      <h3 className='section-title-combo'>Delivery & Services</h3>
      <div className='info-grid'>
        <div className='info-item-enhanced'>
          <div className='info-icon-enhanced'>🚚</div>
          <div className='info-content'>
            <div className='info-title'>Free Delivery</div>
            <div className='info-desc'>On orders above ₹500</div>
          </div>
        </div>

        <div className='info-item-enhanced'>
          <div className='info-icon-enhanced'>🔄</div>
          <div className='info-content'>
            <div className='info-title'>Easy Returns</div>
            <div className='info-desc'>7-day hassle-free returns</div>
          </div>
        </div>

        <div className='info-item-enhanced'>
          <div className='info-icon-enhanced'>✅</div>
          <div className='info-content'>
            <div className='info-title'>Quality Assured</div>
            <div className='info-desc'>Fresh and premium quality</div>
          </div>
        </div>

        <div className='info-item-enhanced'>
          <div className='info-icon-enhanced'>📞</div>
          <div className='info-content'>
            <div className='info-title'>24/7 Support</div>
            <div className='info-desc'>Customer support available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboInfoSection;
