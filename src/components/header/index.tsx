import React from 'react';
import { useCart } from '../../context/CartContext';
import HeaderTitle from './header-title/header-title';
import SearchContainer from './search-container/search-container';

export interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: (query: string) => void;
}
const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onSearch,
}) => {
  const { totalItems, toggleCart } = useCart();

  return (
    <header className='header'>
      <HeaderTitle />

      {/* Search section moved to its own component */}
      <SearchContainer
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSearch={onSearch}
      />
    </header>
  );
};

export default Header;
