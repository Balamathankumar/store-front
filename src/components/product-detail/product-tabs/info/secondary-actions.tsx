import React from 'react';

const SecondaryActions: React.FC = () => (
  <div className='secondary-actions' style={{ margin: '0 0 20px 0' }}>
    <button className='secondary-action-btn'>
      <span className='action-icon'>❤️</span>
      <span className='action-text'>Add to Wishlist</span>
    </button>

    <button className='secondary-action-btn'>
      <span className='action-icon'>📤</span>
      <span className='action-text'>Share</span>
    </button>

    <button className='secondary-action-btn'>
      <span className='action-icon'>📊</span>
      <span className='action-text'>Compare</span>
    </button>
  </div>
);

export default SecondaryActions;
