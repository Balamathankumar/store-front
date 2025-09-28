import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product, WeightOption } from '../../../types';
import { useCart } from '../../../context/CartContext';
// import { useProductSearch } from '../../../hooks/useApi';
import {
  useProduct,
  useProducts,
  useProductSearch,
} from '../../../hooks/useApi';
import ApiService from '../../../services/api';
import HeaderTitle from '../../header/header-title/header-title';
import CategoryNavigation from '../../CategoryNavigation';
import ComboHeader from './combo-header/combo-header';
import ComboImageSection from './combo-image-section/combo-image-section';
import ComboDetailsSection from './combo-details-section/combo-details-section';
import ComboItemsSection from './combo-items-section/combo-items-section';
import ComboActions from './combo-actions/combo-actions';
import ComboInfoSection from './combo-info-section/combo-info-section';

const ComboDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, getItemPrice } = useCart();
  const { search, clearResults } = useProductSearch();
  const [isAdding, setIsAdding] = useState(false);
  const { product } = useProduct(parseInt(id || '0'));
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(100);
  const [combo, setCombo] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [quantity, setQuantity] = useState(1);

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
      } finally {
        setLoading(false);
      }
    };
    fetchCombo();
  }, [id]);

  useEffect(() => {
    if (combo) window.scrollTo(0, 0);
  }, [combo]);

  const handleSearch = (query: string) => {
    if (query.trim()) search(query);
    else clearResults();
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) clearResults();
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    navigate(`/?category=${category}`);
  };

  if (loading || !combo) {
    return (
      <div className='combo-detail-page'>
        <HeaderTitle />
        <CategoryNavigation
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        <div className='combo-detail-container'>
          {loading ? <p>Loading combo details...</p> : <p>Combo not found</p>}
          {!loading && (
            <button onClick={() => navigate('/')}>Back to Store</button>
          )}
        </div>
      </div>
    );
  }

  const totalSavings = combo.totalCost
    ? combo.retailPrice - combo.totalCost
    : 0;

  return (
    <div className='combo-detail-page'>
      <HeaderTitle />
      <CategoryNavigation
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className='combo-detail-container'>
        <ComboHeader combo={combo} navigate={navigate} />

        <div className='combo-detail-content'>
          <ComboImageSection combo={combo} totalSavings={totalSavings} />
          <div className='combo-details-section'>
            <ComboDetailsSection combo={combo} totalSavings={totalSavings} />
            <ComboItemsSection items={combo.items || []} />
            {product && (
              <ComboActions
                combo={combo}
                product={product}
                selectedWeight={selectedWeight}
                addToCart={addToCart}
                quantity={quantity}
                isAdding={isAdding}
                setIsAdding={setIsAdding}
                setQuantity={setQuantity}
                getItemPrice={getItemPrice}
              />
            )}
            <ComboInfoSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboDetail;
