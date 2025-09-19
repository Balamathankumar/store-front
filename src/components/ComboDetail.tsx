import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useProductSearch } from '../hooks/useApi';
import ApiService from '../services/api';
import Header from './Header';
import CategoryNavigation from './CategoryNavigation';
import Breadcrumb from './Breadcrumb';

const ComboDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { search, clearResults } = useProductSearch();
  
  const [combo, setCombo] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchCombo = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const comboData = await ApiService.getCombo(parseInt(id));
        setCombo(comboData);
        setError(null);
      } catch (err) {
        setError('Combo not found');
        console.error('Error fetching combo:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCombo();
  }, [id]);

  useEffect(() => {
    if (combo) {
      // Scroll to top when combo loads
      window.scrollTo(0, 0);
    }
  }, [combo]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      search(query);
    } else {
      clearResults();
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      clearResults();
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Navigate to home page with the selected category
    navigate(`/?category=${category}`);
  };

  if (loading) {
    return (
      <div className="combo-detail-page">
        <Header 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
        />
        
        <CategoryNavigation 
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        <div className="combo-detail-container">
          <div className="loading" style={{ margin: '0 auto' }}></div>
          <p style={{ marginTop: '16px' }}>Loading combo details...</p>
        </div>
      </div>
    );
  }

  if (error || !combo) {
    return (
      <div className="combo-detail-page">
        <Header 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
        />
        
        <CategoryNavigation 
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        <div className="combo-detail-container">
          <h2 style={{ color: '#666', marginBottom: '16px' }}>Combo Not Found</h2>
          <p style={{ marginBottom: '24px' }}>The combo you're looking for doesn't exist.</p>
          <button 
            className="cta-btn" 
            onClick={() => navigate('/')}
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(combo, 100, 1); // Weight parameter not used for combo pricing
  };

  const totalSavings = combo.totalCost ? combo.retailPrice - combo.totalCost : 0;

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Combos', path: '/?filter=combos' },
    { label: combo.name }
  ];

  return (
    <div className="combo-detail-page">
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

      <div className="combo-detail-container">
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

      <div className="combo-detail-content">
        {/* Enhanced Combo Image Section */}
        <div className="combo-image-section">
          <div className="combo-image-container">
            <div className="combo-emoji-enhanced">
              {combo.emoji || '📦'}
            </div>
            
            {combo.badge && (
              <div className="combo-badge-enhanced">
                {combo.badge}
              </div>
            )}

            {/* Wishlist button for combo */}
            <button className="combo-wishlist-btn">
              ❤️
            </button>
          </div>

          {/* Enhanced combo stats */}
          <div className="combo-stats-enhanced">
            <div className="stat-item-enhanced">
              <div className="stat-icon">📦</div>
              <div className="stat-content">
                <div className="stat-value">{combo.items?.length || 0}</div>
                <div className="stat-label">Items Included</div>
              </div>
            </div>
            
            <div className="stat-item-enhanced">
              <div className="stat-icon">⚖️</div>
              <div className="stat-content">
                <div className="stat-value">{combo.items?.reduce((sum, item) => sum + item.quantityInGrams, 0) || 0}g</div>
                <div className="stat-label">Total Weight</div>
              </div>
            </div>
            
            {combo.rating && (
              <div className="stat-item-enhanced">
                <div className="stat-icon">⭐</div>
                <div className="stat-content">
                  <div className="stat-value">{combo.rating}</div>
                  <div className="stat-label">{combo.reviews || 0} Reviews</div>
                </div>
              </div>
            )}

            <div className="stat-item-enhanced">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <div className="stat-value">
                  {combo.totalCost ? Math.round((totalSavings / combo.totalCost) * 100) : 0}%
                </div>
                <div className="stat-label">Savings</div>
              </div>
            </div>
          </div>
          
          {/* Combo highlights */}
          <div className="combo-highlights">
            <div className="highlight-item">
              <span className="highlight-icon">🌿</span>
              <span className="highlight-text">Premium Quality</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">🎁</span>
              <span className="highlight-text">Value Pack</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">🚚</span>
              <span className="highlight-text">Free Shipping</span>
            </div>
          </div>
        </div>

        {/* Enhanced Combo Details Section */}
        <div className="combo-details-section">
          <div className="combo-header-enhanced">
            <div className="combo-category-tag">
              Special Combo
            </div>
            
            <h1 className="combo-title-enhanced">{combo.name}</h1>
            
            {combo.rating && (
              <div className="combo-rating-section">
                <div className="rating-stars">
                  {Array.from({ length: Math.floor(combo.rating) }).map((_, index) => (
                    <span key={index} style={{ color: '#ffd700' }}>⭐</span>
                  ))}
                </div>
                <span className="rating-text">
                  {combo.rating} ({combo.reviews || 0} reviews)
                </span>
              </div>
            )}
            
            <p className="combo-description-enhanced">{combo.description}</p>
          </div>

          {/* Enhanced Price Information */}
          <div className="price-section-combo">
            <div className="price-main-combo">
              <span className="current-price-combo">₹{combo.price || combo.retailPrice}</span>
              {combo.totalCost && (
                <>
                  <span className="original-price-combo">₹{Math.round(combo.totalCost)}</span>
                  <span className="discount-badge-combo">
                    {Math.round((totalSavings / combo.totalCost) * 100)}% OFF
                  </span>
                </>
              )}
            </div>
            
            {combo.totalCost && (
              <div className="savings-highlight">
                <span className="savings-text">You save ₹{Math.round(totalSavings)}</span>
                <span className="savings-note">compared to buying individually</span>
              </div>
            )}
            
            <div className="price-benefits">
              <span className="benefit-item">✓ Free shipping included</span>
              <span className="benefit-item">✓ Premium quality guaranteed</span>
              <span className="benefit-item">✓ Ready to cook combination</span>
            </div>
          </div>

          {/* Enhanced Items in Combo */}
          <div className="combo-items-section-enhanced">
            <h3 className="section-title-combo">What's in this combo:</h3>
            <div className="combo-items-grid-enhanced">
              {combo.items?.map((comboItem, index) => (
                <div key={index} className="combo-item-card-enhanced">
                  <div className="item-number">{index + 1}</div>
                  <div className="item-details">
                    <div className="item-name-enhanced">{comboItem.item.name}</div>
                    {comboItem.item.subCategory && (
                      <div className="item-subcategory-enhanced">{comboItem.item.subCategory}</div>
                    )}
                    <div className="item-meta">
                      <span className="item-category-enhanced">{comboItem.item.category}</span>
                      <span className="item-weight-enhanced">{comboItem.quantityInGrams}g</span>
                    </div>
                  </div>
                  <div className="item-status">
                    <span className="status-icon">✓</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Add to Cart Section */}
          <div className="add-to-cart-section-enhanced">
            <div className="quantity-selector-combo">
              <label className="quantity-label">Quantity:</label>
              <div className="quantity-controls-combo">
                <button className="qty-btn">−</button>
                <span className="qty-value">1</span>
                <button className="qty-btn">+</button>
              </div>
            </div>

            <div className="action-buttons-combo">
              <button
                onClick={handleAddToCart}
                className="add-to-cart-btn-combo"
              >
                <span className="btn-icon-combo">🛒</span>
                <span className="btn-text-combo">Add Combo to Cart</span>
              </button>
              
              <button className="buy-now-btn-combo">
                <span className="btn-icon-combo">⚡</span>
                <span className="btn-text-combo">Buy Now</span>
              </button>
            </div>
            
            {/* Enhanced Quick Actions */}
            <div className="quick-actions-enhanced">
              <button className="quick-action-btn-enhanced">
                <span className="qa-icon">💝</span>
                <span className="qa-text">Gift Wrap</span>
                <span className="qa-price">+₹50</span>
              </button>
              
              <button className="quick-action-btn-enhanced">
                <span className="qa-icon">❤️</span>
                <span className="qa-text">Wishlist</span>
              </button>
              
              <button className="quick-action-btn-enhanced">
                <span className="qa-icon">📤</span>
                <span className="qa-text">Share</span>
              </button>
            </div>
          </div>

          {/* Enhanced Additional Info */}
          <div className="additional-info-enhanced">
            <h3 className="section-title-combo">Delivery & Services</h3>
            <div className="info-grid">
              <div className="info-item-enhanced">
                <div className="info-icon-enhanced">🚚</div>
                <div className="info-content">
                  <div className="info-title">Free Delivery</div>
                  <div className="info-desc">On orders above ₹500</div>
                </div>
              </div>
              
              <div className="info-item-enhanced">
                <div className="info-icon-enhanced">🔄</div>
                <div className="info-content">
                  <div className="info-title">Easy Returns</div>
                  <div className="info-desc">7-day hassle-free returns</div>
                </div>
              </div>
              
              <div className="info-item-enhanced">
                <div className="info-icon-enhanced">✅</div>
                <div className="info-content">
                  <div className="info-title">Quality Assured</div>
                  <div className="info-desc">Fresh and premium quality</div>
                </div>
              </div>
              
              <div className="info-item-enhanced">
                <div className="info-icon-enhanced">📞</div>
                <div className="info-content">
                  <div className="info-title">24/7 Support</div>
                  <div className="info-desc">Customer support available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ComboDetail;