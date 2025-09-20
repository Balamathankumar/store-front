import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product, WeightOption } from '../types';
import { useCart } from '../context/CartContext';
import { useProduct, useProducts, useProductSearch } from '../hooks/useApi';
import { getProductImageUrls, getCategoryEmoji } from '../utils/imageUtils';
import Breadcrumb from './Breadcrumb';
import Header from './Header';
import CategoryNavigation from './CategoryNavigation';
import ProductImage from './ProductImage';

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

  const weights: WeightOption[] = [50, 100, 200, 250, 500];

  // Get product images - either from API or fallback to emojis
  const [productImages, setProductImages] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      // Scroll to top when product loads
      window.scrollTo(0, 0);
      
      // Set up product images
      if (product.imageUrl) {
        setProductImages([product.imageUrl]);
      } else {
        // Generate URLs for multiple images from the API
        setProductImages(getProductImageUrls(product.id, 3));
      }
    }
  }, [product]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      search(query);
    } else {
      clearResults();
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      handleSearch(query);
    } else {
      clearResults();
    }
  };

  const handleProductClick = (clickedProduct: Product) => {
    setSearchQuery('');
    clearResults();
    navigate(`/product/${clickedProduct.id}`);
  };

  const handleCategoryChange = (categoryName: string) => {
    setActiveCategory(categoryName);
    if (categoryName === 'all') {
      navigate('/');
    } else {
      navigate(`/?category=${categoryName}`);
    }
  };

  // Get related products from the same category
  const relatedProducts = allProducts
    ?.filter(p => p.category === product?.category && p.id !== product?.id)
    ?.slice(0, 4) || [];

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAdding(true);
    addToCart(product, selectedWeight, quantity);
    
    // Show feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    
    addToCart(product, selectedWeight, quantity);
    // Navigate directly to checkout page
    navigate('/checkout');
  };

  const getProductEmoji = (product: Product): string => {
    return product.emoji || getCategoryEmoji(product.category);
  };

  const renderStars = (rating: number = 4.5) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        {Array.from({ length: fullStars }).map((_, index) => (
          <span key={index} style={{ color: '#ffd700' }}>⭐</span>
        ))}
        {hasHalfStar && <span style={{ color: '#ffd700' }}>⭐</span>}
        {Array.from({ length: 5 - Math.ceil(rating) }).map((_, index) => (
          <span key={index} style={{ color: '#ddd' }}>⭐</span>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 16px', textAlign: 'center' }}>
        <div className="loading" style={{ margin: '0 auto' }}></div>
        <p style={{ marginTop: '16px' }}>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '40px 16px', textAlign: 'center' }}>
        <h2 style={{ color: '#666', marginBottom: '16px' }}>Product Not Found</h2>
        <p style={{ marginBottom: '24px' }}>The product you're looking for doesn't exist.</p>
        <button 
          className="cta-btn" 
          onClick={() => navigate('/')}
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const currentPrice = getItemPrice(product, selectedWeight);
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)
    : 0;

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: product.category.charAt(0).toUpperCase() + product.category.slice(1), path: `/?category=${product.category}` },
    { label: product.name }
  ];

  return (
    <div className="product-detail-page">
      {/* Header with Search */}
      <Header 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearch={handleSearch}
      />
      
      {/* Category Navigation */}
      <CategoryNavigation 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="container" style={{ paddingTop: '20px', paddingBottom: '100px' }}>
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Back Button */}
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
            fontSize: '16px'
          }}
        >
          ← Back
        </button>

      <div className="product-detail-content">
        {/* Product Images Section */}
        <div className="product-detail-images">
          {/* Main Product Image */}
          <div className="main-image-container" style={{ position: 'relative' }}>
            <ProductImage
              product={product}
              imageIndex={selectedImageIndex}
              className="main-product-image"
              style={{
                width: '100%',
                height: '350px',
                borderRadius: '20px',
                position: 'relative',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                fontSize: '140px'
              }}
            />
            
            {/* Product Badge */}
            {product.badge && (
              <div className="product-badge" style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10
              }}>
                {product.badge}
              </div>
            )}
            
            {/* Wishlist Button */}
            <button className="wishlist-btn" style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              zIndex: 10
            }}>
              ❤️
            </button>
            
            {/* Zoom Indicator */}
            <div className="zoom-indicator" style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              zIndex: 10
            }}>
              🔍
            </div>
          </div>

          {/* Image Thumbnails */}
          <div className="image-thumbnails">
            {productImages.map((imageUrl, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`thumbnail-btn ${selectedImageIndex === index ? 'active' : ''}`}
              >
                <ProductImage
                  product={product}
                  imageIndex={index}
                  className="thumbnail-content"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '8px',
                    fontSize: '24px'
                  }}
                  fallbackToEmoji={true}
                />
              </button>
            ))}
          </div>

          {/* Product Features Grid */}
          <div className="product-features-grid">
            <div className="feature-item">
              <span className="feature-icon">🌿</span>
              <span className="feature-text">100% Natural</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⭐</span>
              <span className="feature-text">Premium Quality</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🚚</span>
              <span className="feature-text">Fast Delivery</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💰</span>
              <span className="feature-text">Best Price</span>
            </div>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="product-detail-info">
          {/* Product Header */}
          <div className="product-header">
            <div className="product-category-tag">
              {product.category.replace('_', ' ')}
            </div>
            
            <h1 className="product-title">
              {product.name}
            </h1>

            <div className="product-rating-section">
              <div className="rating-stars">
                {renderStars(product.rating)}
              </div>
              <div className="rating-info">
                <span className="rating-value">{product.rating || 4.5}</span>
                <span className="rating-count">({product.reviews || 0} reviews)</span>
                <button className="rating-link">See all reviews →</button>
              </div>
            </div>

            <p className="product-description">
              {product.description}
            </p>
          </div>

          {/* Price Section */}
          <div className="price-section-enhanced">
            <div className="price-main">
              <span className="current-price">₹{currentPrice}</span>
              {product.originalPrice && (
                <>
                  <span className="original-price">₹{product.originalPrice}</span>
                  <span className="discount-badge">
                    {discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>
            <div className="price-details">
              <span className="price-note">✓ Inclusive of all taxes</span>
              <span className="shipping-note">🚚 Free shipping over ₹1000</span>
            </div>
          </div>

          {/* Weight Selection */}
          <div className="weight-selection-section">
            <h3 className="section-subtitle">Select Weight:</h3>
            <div className="weight-options-grid">
              {weights.map(weight => {
                const weightPrice = getItemPrice(product, weight);
                const savings = product.originalPrice ? Math.round(((product.originalPrice - weightPrice) / product.originalPrice) * 100) : 0;
                
                return (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={`weight-option ${selectedWeight === weight ? 'active' : ''}`}
                  >
                    <div className="weight-value">{weight}g</div>
                    <div className="weight-price">₹{weightPrice}</div>
                    {savings > 0 && <div className="weight-savings">Save {savings}%</div>}
                    {selectedWeight === weight && <div className="weight-selected-indicator">✓</div>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="quantity-selection-section">
            <h3 className="section-subtitle">Quantity:</h3>
            <div className="quantity-row">
              <div className="quantity-controls">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-btn"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="quantity-value">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
              <div className="quantity-total">
                <span className="total-label">Total: </span>
                <span className="total-value">₹{currentPrice * quantity}</span>
              </div>
            </div>
            <div className="bulk-discount-note">
              💡 Buy 3+ items and get 5% extra discount
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons-section">
            <div className="primary-actions">
              <button
                onClick={handleAddToCart}
                className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
                disabled={isAdding}
              >
                <span className="btn-icon">
                  {isAdding ? '✓' : '🛒'}
                </span>
                <span className="btn-text">
                  {isAdding ? 'Added to Cart' : 'Add to Cart'}
                </span>
              </button>
              
              <button
                onClick={handleBuyNow}
                className="buy-now-btn"
              >
                <span className="btn-icon">⚡</span>
                <span className="btn-text">Buy Now</span>
              </button>
            </div>
            
            <div className="secondary-actions">
              <button className="secondary-action-btn">
                <span className="action-icon">❤️</span>
                <span className="action-text">Add to Wishlist</span>
              </button>
              
              <button className="secondary-action-btn">
                <span className="action-icon">📤</span>
                <span className="action-text">Share</span>
              </button>
              
              <button className="secondary-action-btn">
                <span className="action-icon">📊</span>
                <span className="action-text">Compare</span>
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="trust-indicators">
            <div className="trust-item">
              <span className="trust-icon">🔒</span>
              <span className="trust-text">Secure Payment</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🚚</span>
              <span className="trust-text">Fast Delivery</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">↩️</span>
              <span className="trust-text">Easy Returns</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✅</span>
              <span className="trust-text">Quality Assured</span>
            </div>
          </div>

          {/* Product Information Tabs */}
          <div className="product-info-tabs">
            <div className="tabs-container">
              <div className="tab-headers">
                <button className="tab-header active">Details</button>
                <button className="tab-header">Specifications</button>
                <button className="tab-header">Delivery</button>
                <button className="tab-header">Reviews</button>
              </div>
              
              <div className="tab-content">
                {/* Product Details Tab */}
                <div className="tab-panel active">
                  <div className="detail-items">
                    <div className="detail-item">
                      <span className="detail-label">Category:</span>
                      <span className="detail-value">{product.category.replace('_', ' ')}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Brand:</span>
                      <span className="detail-value">{product.supplier?.name || 'SpiceVault'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Shelf Life:</span>
                      <span className="detail-value">12 months from manufacturing</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Storage:</span>
                      <span className="detail-value">Store in cool, dry place away from sunlight</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Origin:</span>
                      <span className="detail-value">Sourced from premium farms in India</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Processing:</span>
                      <span className="detail-value">Naturally processed without artificial preservatives</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="delivery-info-section">
            <h3 className="section-subtitle">📦 Delivery Information</h3>
            <div className="delivery-grid">
              <div className="delivery-item">
                <div className="delivery-icon">🚚</div>
                <div className="delivery-content">
                  <div className="delivery-title">Free Delivery</div>
                  <div className="delivery-desc">On orders over ₹1000</div>
                </div>
              </div>
              <div className="delivery-item">
                <div className="delivery-icon">⏰</div>
                <div className="delivery-content">
                  <div className="delivery-title">Express Delivery</div>
                  <div className="delivery-desc">2-3 business days</div>
                </div>
              </div>
              <div className="delivery-item">
                <div className="delivery-icon">💰</div>
                <div className="delivery-content">
                  <div className="delivery-title">Cash on Delivery</div>
                  <div className="delivery-desc">Available for all orders</div>
                </div>
              </div>
              <div className="delivery-item">
                <div className="delivery-icon">🔄</div>
                <div className="delivery-content">
                  <div className="delivery-title">Easy Returns</div>
                  <div className="delivery-desc">7-day hassle-free returns</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h3 className="section-title">Related Products</h3>
          <div className="related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              <div 
                key={relatedProduct.id}
                className="related-product-card"
                onClick={() => handleProductClick(relatedProduct)}
              >
                <ProductImage
                  product={relatedProduct}
                  className="related-product-image"
                  style={{
                    width: '100%',
                    height: '80px',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    fontSize: '48px'
                  }}
                />
                <div className="related-product-name">
                  {relatedProduct.name}
                </div>
                <div className="related-product-price">
                  ₹{relatedProduct.retailPrice}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ProductDetail;
