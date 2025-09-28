import React from 'react';
import { Product } from '../types';
import ProductCard from './product-card/components/index';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onProductClick?: (productId: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  error,
  onProductClick,
}) => {
  if (loading) {
    return (
      <div className='product-grid'>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className='product-card'>
            <div className='product-image'>
              <div className='loading'></div>
            </div>
            <div className='product-info'>
              <div
                style={{
                  height: '20px',
                  background: '#f0f0f0',
                  borderRadius: '4px',
                  marginBottom: '8px',
                }}
              ></div>
              <div
                style={{
                  height: '40px',
                  background: '#f0f0f0',
                  borderRadius: '4px',
                  marginBottom: '8px',
                }}
              ></div>
              <div
                style={{
                  height: '30px',
                  background: '#f0f0f0',
                  borderRadius: '4px',
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          color: '#666',
        }}
      >
        <p>Error loading products: {error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: 'var(--brand-brown)',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            marginTop: '16px',
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          color: '#666',
        }}
      >
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className='product-grid' id='product-grid'>
      {products.map((product, index) => {
        const uniqueKey =
          product.sku ||
          `${product.id}-${product.name.replace(/\s+/g, '-')}-${index}`;
        return (
          <ProductCard
            key={uniqueKey}
            product={product}
            onProductClick={onProductClick}
          />
        );
      })}
    </div>
  );
};

export default ProductGrid;
