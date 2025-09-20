import React from 'react';

type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating' | 'new' | 'combos';

interface FilterBarProps {
  activeSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeSort, onSortChange }) => {
  const filters: { key: SortOption; label: string }[] = [
    { key: 'popular', label: 'Popular' },
    { key: 'price-low', label: 'Price: Low-High' },
    { key: 'price-high', label: 'Price: High-Low' },
    { key: 'rating', label: 'Top Rated' },
    { key: 'new', label: 'New Arrivals' },
    { key: 'combos', label: '🎁 Combo Deals' }
  ];

  return (
    <div className="filter-bar">
      <div className="filter-bar-container">
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={`filter-btn ${activeSort === filter.key ? 'active' : ''}`}
            onClick={() => onSortChange(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
