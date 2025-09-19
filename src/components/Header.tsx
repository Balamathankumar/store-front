import React from 'react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange, onSearch }) => {
  const { totalItems, toggleCart } = useCart();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">🌰 SpiceX</div>
        <div className="header-icons">
          <button className="icon" onClick={() => alert('Wishlist feature coming soon!')}>
            ❤️
            <span className="cart-count">2</span>
          </button>
          <button className="icon" onClick={toggleCart}>
            🛒
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </button>
          <button className="icon" onClick={() => alert('Profile feature coming soon!')}>
            👤
          </button>
        </div>
      </div>
      
      <div className="search-container">
        <div className="search-box">
          <form onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search nuts, spices, herbs..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyUp={handleKeyPress}
            />
            <button type="submit" className="search-btn">🔍</button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
