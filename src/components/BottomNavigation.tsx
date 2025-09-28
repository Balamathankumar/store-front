import React from 'react';
import { useCart } from '../context/CartContext';

const BottomNavigation: React.FC = () => {
  const { toggleCart } = useCart();

  const navItems = [
    { id: 'home', icon: '🏠', label: 'Home', active: true },
    {
      id: 'search',
      icon: '🔍',
      label: 'Search',
      active: false,
      disabled: true,
    },
    {
      id: 'cart',
      icon: '🛒',
      label: 'Cart',
      active: false,
      onClick: toggleCart,
    },
    // { id: 'wishlist', icon: '❤️', label: 'Wishlist', active: false },
    // { id: 'profile', icon: '👤', label: 'Profile', active: false }
  ];

  const handleNavClick = (item: (typeof navItems)[0]) => {
    if (item.disabled) return; // ✅ prevent click
    if (item.onClick) {
      item.onClick();
    } else if (item.id !== 'home') {
      alert(`${item.label} feature coming soon!`);
    }
  };

  return (
    <nav className='bottom-nav'>
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${item.active ? 'active' : ''} ${
            item.disabled ? 'disabled' : ''
          }`}
          onClick={() => handleNavClick(item)}
          disabled={item.disabled} // ✅ disable button
        >
          <div>{item.icon}</div>
          <div className='nav-text'>{item.label}</div>
        </button>
      ))}
    </nav>
  );
};

export default BottomNavigation;
