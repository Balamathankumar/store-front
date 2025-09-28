import React from 'react';
import { Product } from '../../../../types';

interface AddToCartButtonProps {
  product: Product;
  isAdding: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  isAdding,
  onClick,
}) => {
  return (
    <button
      className={`add-to-cart ${product.isCombo ? 'combo-add-to-cart' : ''}`}
      onClick={onClick}
      style={{ background: isAdding ? '#27ae60' : undefined }}
    >
      {isAdding
        ? product.isCombo
          ? '🎁 Added!'
          : 'Added!'
        : product.isCombo
        ? '🎁 Add Combo'
        : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;
