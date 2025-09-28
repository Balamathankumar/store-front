import React from 'react';

interface SearchContainerProps {
  searchQuery: HeaderProps['searchQuery'];
  onSearchChange: HeaderProps['onSearchChange'];
  onSearch: HeaderProps['onSearch'];
}
export interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: (query: string) => void;
}

const SearchContainer: React.FC<SearchContainerProps> = ({
  searchQuery,
  onSearchChange,
  onSearch,
}) => {
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
    <div className='search-container'>
      <div className='search-box'>
        <form onSubmit={handleSearchSubmit}>
          <input
            type='text'
            className='search-input'
            placeholder='Search nuts, spices, herbs...'
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyUp={handleKeyPress}
          />
          <button type='submit' className='search-btn'>
            🔍
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchContainer;
