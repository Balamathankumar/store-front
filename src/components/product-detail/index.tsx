import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useProduct, useProducts, useProductSearch } from '../../hooks/useApi';
import { getProductImageUrls } from '../../utils/imageUtils';
import { Product, WeightOption } from '../../types';
import Breadcrumb from '../Breadcrumb';
import HeaderTitle from '../header/header-title/header-title';
import CategoryNavigation from '../CategoryNavigation';

import ProductImages from './product-Images/product-images';
import ProductInfo from './product-info/product-info';
import ProductActions from './product-actions/product-actions';
import ProductTabs from './product-tabs/product-tabs';
import RelatedProducts from './related-products/related-products';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, getItemPrice } = useCart();

  const { product, loading, error } = useProduct(parseInt(id || '0'));
  const { products: allProducts } = useProducts();
  const { search, clearResults } = useProductSearch();

  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(100);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [productImages, setProductImages] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      window.scrollTo(0, 0);
      setProductImages(
        product.imageUrl
          ? [product.imageUrl]
          : getProductImageUrls(product.id, 3)
      );
    }
  }, [product]);

  const relatedProducts =
    allProducts
      ?.filter((p) => p.category === product?.category && p.id !== product?.id)
      ?.slice(0, 4) || [];

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <button onClick={() => navigate('/')}>Back to Shop</button>
      </div>
    );
  }

  return (
    <div className='product-detail-page'>
      <HeaderTitle />

      <CategoryNavigation
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className='container' style={{ padding: '20px 0 100px' }}>
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: product.category, path: `/?category=${product.category}` },
            { label: product.name },
          ]}
        />

        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--brand-brown)',
            marginBottom: '20px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          ← Back
        </button>

        <div className='product-detail-content'>
          <ProductImages
            product={product}
            productImages={productImages}
            selectedImageIndex={selectedImageIndex}
            setSelectedImageIndex={setSelectedImageIndex}
          />

          <div className='product-detail-info'>
            <ProductInfo
              product={product}
              selectedWeight={selectedWeight}
              setSelectedWeight={setSelectedWeight}
              quantity={quantity}
              setQuantity={setQuantity}
              getItemPrice={getItemPrice}
            />

            <ProductActions
              product={product}
              selectedWeight={selectedWeight}
              quantity={quantity}
              isAdding={isAdding}
              setIsAdding={setIsAdding}
            />

            <ProductTabs product={product} />
          </div>
        </div>
        <RelatedProducts
          relatedProducts={relatedProducts}
          onProductClick={(p) => navigate(`/product/${p.id}`)}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
