import React from 'react';
import { Product } from '../../../../types';

export interface ApiComboItem {
  item: {
    id: number;
    name: string;
    subCategory?: string | null;
    category: 'NUT' | 'DRY FRUIT' | 'SPICE' | 'SEEDS';
    imageUrl?: string | null;
    imageFilenames?: string[];
  };
  quantityInGrams: number;
}

interface Props {
  items?: ApiComboItem[];
}

const ComboItemsSection: React.FC<Props> = ({ items }) => {
  if (!items?.length) return null;

  return (
    <div className='combo-items-section-enhanced'>
      <h3 className='section-title-combo'>What's in this combo:</h3>
      <div className='combo-items-grid-enhanced'>
        {items?.map((comboItem, index) => (
          <div key={index} className='combo-item-card-enhanced'>
            <div className='item-number'>{index + 1}</div>
            <div className='item-details'>
              <div className='item-name-enhanced'>{comboItem.item.name}</div>
              {comboItem.item.subCategory && (
                <div className='item-subcategory-enhanced'>
                  {comboItem.item.subCategory}
                </div>
              )}
              <div className='item-meta'>
                <span className='item-category-enhanced'>
                  {comboItem.item.category}
                </span>
                <span className='item-weight-enhanced'>
                  {comboItem.quantityInGrams}g
                </span>
              </div>
            </div>
            <div className='item-status'>
              <span className='status-icon'>✓</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComboItemsSection;
