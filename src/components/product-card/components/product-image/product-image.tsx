import React, { useState, useEffect } from 'react';
// import {
//   getProductImageUrl,
//   getCategoryEmoji,
// } from '../../../../utils/imageUtils';
import {
  getProductImageUrl,
  getCategoryEmoji,
} from '../../utill/product-utill';
import ApiService from '../../../../services/api';
import { Product } from '../../../../types';

interface ProductImageProps {
  product: Product;
  imageIndex?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  fallbackToEmoji?: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({
  product,
  imageIndex = 0,
  className = '',
  style = {},
  onClick,
  fallbackToEmoji = true,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [productImages, setProductImages] = useState<string[]>([]);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);

    const loadImages = async () => {
      try {
        if (product.imageFilenames && product.imageFilenames.length > 0) {
          const filename =
            product.imageFilenames[imageIndex] || product.imageFilenames[0];
          setImageUrl(getProductImageUrl(product.id, imageIndex, filename));
          return;
        }

        if (product.imageUrl) {
          setImageUrl(product.imageUrl);
          return;
        }

        // Try to fetch images from API
        const images = await ApiService.getProductImages(product.id);
        setProductImages(images);

        if (images.length > imageIndex) {
          setImageUrl(images[imageIndex]);
        } else {
          // Use API endpoint pattern as fallback
          setImageUrl(getProductImageUrl(product.id, imageIndex));
        }
      } catch (error) {
        // Use API endpoint pattern as fallback
        setImageUrl(getProductImageUrl(product.id, imageIndex));
      }
    };

    loadImages();
  }, [product, imageIndex]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoaded(false);
    setImageError(true);
  };

  const getFallbackEmoji = (): string => {
    return product.emoji || getCategoryEmoji(product.category);
  };

  const showEmoji = (!imageLoaded || imageError) && fallbackToEmoji;
  const BASE_URL = 'https://api.srisainutsandspices.com';
  return (
    <div
      className={`product-image-container ${className}`}
      style={style}
      onClick={onClick}
    >
      {/* Actual image */}
      {imageUrl && !imageError && (
        <img
          src={`${BASE_URL}${imageUrl}`}
          alt={product.name}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: imageLoaded ? 'block' : 'none',
            borderRadius: 'inherit',
          }}
        />
      )}

      {/* Emoji fallback */}
      {showEmoji && (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(45deg, #F3E8DE, #EBD9C8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: style.fontSize || '48px',
            borderRadius: 'inherit',
          }}
        >
          {getFallbackEmoji()}
        </div>
      )}

      {/* Loading state */}
      {!imageLoaded && !imageError && imageUrl && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(45deg, #F3E8DE, #EBD9C8)',
            borderRadius: 'inherit',
          }}
        >
          <div className='loading'></div>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
