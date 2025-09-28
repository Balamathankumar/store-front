import React from 'react';
import { Product } from '../../../types';
import ProductImage from '../../ProductImage';

interface Props {
  relatedProducts: Product[];
  onProductClick: (p: Product) => void;
}

const RelatedProducts: React.FC<Props> = ({
  relatedProducts,
  onProductClick,
}) => {
  if (!relatedProducts.length) return null;

  return (
    <div className='related-products-section'>
      <h3 className='section-title'>Related Products</h3>
      <div className='related-products-grid'>
        {relatedProducts.map((p) => (
          <div
            key={p.id}
            className='related-product-card'
            onClick={() => onProductClick(p)}
          >
            <ProductImage
              product={p}
              className='related-product-image'
              style={{ width: '100%', height: '80px', borderRadius: '8px' }}
            />
            <div className='related-product-name'>{p.name}</div>
            <div className='related-product-price'>₹{p.retailPrice}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
