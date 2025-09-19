import React from 'react';
import { useCategories } from '../hooks/useApi';

interface CategoryNavigationProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({ 
  activeCategory, 
  onCategoryChange 
}) => {
  const { categories, loading } = useCategories();

  const defaultCategories = [
    { name: 'all', emoji: '🏠', count: 0 },
    { name: 'NUT', emoji: '🥜', count: 0 },
    { name: 'SPICE', emoji: '🌶️', count: 0 },
    { name: 'DRY FRUIT', emoji: '🍇', count: 0 },
    { name: 'SEEDS', emoji: '🌱', count: 0 }
  ];

  const categoryEmojis: { [key: string]: string } = {
    'NUT': '🥜',
    'SPICE': '🌶️',
    'DRY FRUIT': '🍇',
    'SEEDS': '🌱'
  };

  const safeCategories = Array.isArray(categories) ? categories : [];

  const displayCategories = loading || safeCategories.length === 0 ? defaultCategories : [
    { name: 'all', emoji: '🏠', count: 0 },
    ...safeCategories.map(category => ({
      name: category,
      emoji: categoryEmojis[category] || '📦',
      count: 0
    }))
  ];

  return (
    <nav className="nav-categories">
      {displayCategories.map((category) => (
        <button
          key={category.name}
          className={`category-chip ${activeCategory === category.name ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.name)}
        >
          {category.emoji} {category.name === 'all' ? 'All' : category.name.charAt(0).toUpperCase() + category.name.slice(1)}
        </button>
      ))}
    </nav>
  );
};

export default CategoryNavigation;
