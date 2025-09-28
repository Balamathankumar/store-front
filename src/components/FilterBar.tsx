import React, { useState } from 'react';
import { CloseCircle, Filter } from 'iconsax-reactjs';
import { MdClose } from 'react-icons/md';

type SortOption =
  | 'popular'
  | 'price-low'
  | 'price-high'
  | 'rating'
  | 'new'
  | 'combos';

interface FilterBarProps {
  activeSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeSort, onSortChange }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const filters: { key: SortOption; label: string }[] = [
    { key: 'popular', label: 'Popular' },
    { key: 'price-low', label: 'Price: Low-High' },
    { key: 'price-high', label: 'Price: High-Low' },
    { key: 'rating', label: 'Top Rated' },
    { key: 'new', label: 'New Arrivals' },
    { key: 'combos', label: '🎁 Combo Deals' },
  ];

  return (
    <div className='filter-bar'>
      {/* Desktop view */}
      <div className='filter-bar-container desktop-view'>
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={`filter-btn ${
              activeSort === filter.key ? 'active' : ''
            }`}
            onClick={() => onSortChange(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Mobile view */}
      <div className='mobile-view'>
        <button
          className='filter-btn mobile-toggle'
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Filter size={18} />
          Filters
        </button>

        {mobileOpen && (
          <div className='mobile-dropdown'>
            <div className='mobile-dropdown-header'>
              <h3>Sort By</h3>
              <button
                onClick={() => setMobileOpen(false)}
                className='close-btn'
              >
                <CloseCircle size={18} />
              </button>
            </div>
            <div className='mobile-dropdown-options'>
              {filters.map((filter) => (
                <label key={filter.key} className='checkbox-option'>
                  <input
                    type='checkbox'
                    checked={activeSort === filter.key}
                    onChange={() => onSortChange(filter.key)}
                  />
                  <span>{filter.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
