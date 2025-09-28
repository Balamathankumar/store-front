import React from 'react';
import { useCart } from '../../../context/CartContext';
import logoImg from '../../../assets/image/logo-srisai.png';

const HeaderTitle: React.FC = ({}) => {
  const { totalItems, toggleCart } = useCart();

  return (
    <header className='header'>
      <div className='header-top'>
        <div className='logo'>
          <img
            src={logoImg}
            alt='Store Logo'
            width={290}
            height={90}
            style={{ borderRadius: '8px' }}
          />
        </div>
        <div className='header-icons'>
          {/* <button
            className='icon'
            onClick={() => alert('Wishlist feature coming soon!')}
          >
            ❤️
            <span className='cart-count'>2</span>
          </button> */}
          <button className='icon' onClick={toggleCart}>
            🛒
            {totalItems > 0 && <span className='cart-count'>{totalItems}</span>}
          </button>
          {/* <button
            className='icon'
            onClick={() => alert('Profile feature coming soon!')}
          >
            👤
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default HeaderTitle;
