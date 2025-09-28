import React from 'react';
import { Product } from '../../../types';
import ProductImage from '../../ProductImage';

interface Props {
  product: Product;
  productImages: string[];
  selectedImageIndex: number;
  setSelectedImageIndex: (i: number) => void;
}

const ProductImages: React.FC<Props> = ({
  product,
  productImages,
  selectedImageIndex,
  setSelectedImageIndex,
}) => {
  return (
    <div className='product-detail-images'>
      {/* Main Image */}
      <div className='main-image-container'>
        <ProductImage
          product={product}
          imageIndex={selectedImageIndex}
          className='main-product-image'
        />
      </div>

      <div className='image-thumbnails'>
        {productImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`thumbnail-btn ${
              selectedImageIndex === index ? 'active' : ''
            }`}
          >
            <ProductImage
              product={product}
              imageIndex={index}
              className='thumbnail-content'
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
