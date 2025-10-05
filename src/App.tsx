import React, { useState, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import './App.css';
import { CartProvider } from './context/CartContext';
import { useProducts, useProductSearch } from './hooks/useApi';

// Components
import Header from './components/header/index';
import CategoryNavigation from './components/CategoryNavigation';
import HeroSection from './components/HeroSection';
import FilterBar from './components/FilterBar';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/product-detail/index';
import ComboDetail from './components/combo-detail/components/index';
import CheckoutPage from './components/CheckoutPage';
// import CheckoutPage from './components/checkout/CheckoutPage';
import CartModal from './components/CartModal';
import BottomNavigation from './components/BottomNavigation';
import Footer from './components/Footer';
import PromoBanner from './components/PromoBanner';
import WhatsAppWidget from './components/whatsapp-widget/whatsapp-widget';
import LoginPage from './components/login/login';
import { OtpPage } from './components/login/otp';

type SortOption =
  | 'popular'
  | 'price-low'
  | 'price-high'
  | 'rating'
  | 'new'
  | 'combos';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSort, setActiveSort] = useState<SortOption>('popular');
  const [isHeroHidden, setIsHeroHidden] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isPromoBannerDismissed, setIsPromoBannerDismissed] = useState(false);
  console.log('🏷️ setIsSearchMode:', isSearchMode);
  console.log('🏷️ activeCategory:', activeCategory);
  console.log('🏷️ isHeroHidden:', isHeroHidden);

  // API hooks
  const {
    products: allProducts,
    loading: productsLoading,
    error: productsError,
  } = useProducts();
  const {
    results: searchResults,
    loading: searchLoading,
    search,
    clearResults,
  } = useProductSearch();

  // Handle opening cart from product detail "Buy Now"
  React.useEffect(() => {
    if (location.state?.openCart) {
      // This would require access to cart context, for now we'll just scroll to top
      window.scrollTo(0, 0);
    }
  }, [location.state]);

  // Handle search
  const handleSearch = (query: string) => {
    if (query.trim()) {
      setIsSearchMode(true);
      setIsHeroHidden(true);
      const category =
        activeCategory !== 'all'
          ? (activeCategory as 'NUT' | 'DRY FRUIT' | 'SPICE' | 'SEEDS')
          : undefined;
      search(query, category);
    } else {
      setIsSearchMode(false);
      clearResults();
      setIsHeroHidden(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setIsSearchMode(false);
      clearResults();
      setIsHeroHidden(false);
    }
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    console.log('🔄 Category changed to:', category);
    setActiveCategory(category);
    setIsHeroHidden(category !== 'all' || isSearchMode);

    // If in search mode, update search with new category
    if (isSearchMode && searchQuery.trim()) {
      const searchCategory =
        category !== 'all'
          ? (category as 'NUT' | 'DRY FRUIT' | 'SPICE' | 'SEEDS')
          : undefined;
      search(searchQuery, searchCategory);
    }
  };

  // Handle sort change
  const handleSortChange = (sort: SortOption) => {
    console.log('🔄 Filter changed to:', sort);
    setActiveSort(sort);
    setIsHeroHidden(true);
  };

  // Handle banner dismissal
  const handleBannerDismiss = () => {
    setIsPromoBannerDismissed(true);
  };

  // Sort and filter products
  const displayProducts = useMemo(() => {
    let products =
      isSearchMode && searchResults ? searchResults.items : allProducts;

    // Filter by category
    if (activeCategory !== 'all') {
      products = products.filter(
        (product) => product.category === activeCategory
      );
    }

    // Sort and filter products
    const sortedProducts = [...products];

    switch (activeSort) {
      case 'price-low':
        return sortedProducts.sort((a, b) => a.retailPrice - b.retailPrice);
      case 'price-high':
        return sortedProducts.sort((a, b) => b.retailPrice - a.retailPrice);
      case 'rating':
        return sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'new':
        return sortedProducts
          .filter((p) => p.badge === 'NEW')
          .concat(sortedProducts.filter((p) => p.badge !== 'NEW'));
      case 'combos':
        // Filter to show only combo products (either isCombo: true or badge: "COMBO")
        console.log('🔍 Checking all products for combo status:');
        sortedProducts.forEach((p) => {
          console.log(
            `Product ${p.id} (${p.name}): isCombo=${p.isCombo}, badge="${p.badge}"`
          );
        });

        const comboProducts = sortedProducts.filter(
          (product) => product.isCombo === true || product.badge === 'COMBO'
        );
        console.log(
          'Combo filter activated. Total products:',
          sortedProducts.length
        );
        console.log('Combo products found:', comboProducts.length);
        console.log(
          'Combo products:',
          comboProducts.map((p) => ({
            id: p.id,
            name: p.name,
            isCombo: p.isCombo,
            badge: p.badge,
          }))
        );
        return comboProducts;
      default:
        return sortedProducts;
    }
  }, [allProducts, searchResults, activeCategory, activeSort, isSearchMode]);

  // Handle product click (navigate to product detail page)
  const handleProductClick = (productId: number) => {
    // Always check for combo products correctly, regardless of active filter
    // First, try to find the product in displayProducts (what user actually clicked on)
    let product = displayProducts.find((p) => p.id === productId);

    // If not found in displayProducts, or if we found a regular product but there might be a combo with same ID,
    // also check allProducts for a combo version
    if (!product) {
      product = allProducts.find((p) => p.id === productId);
    } else {
      // Even if we found a product in displayProducts, check if there's a combo version in allProducts
      const comboVersion = allProducts.find(
        (p) => p.id === productId && (p.isCombo === true || p.badge === 'COMBO')
      );
      if (comboVersion && !product.isCombo) {
        product = comboVersion; // Prefer combo version if it exists
      }
    }

    console.log('Product clicked:', productId);
    console.log('Current filter (activeSort):', activeSort);
    console.log('All products count:', allProducts.length);
    console.log('Display products count:', displayProducts.length);
    console.log('Found product:', product);
    console.log('Is combo?', product?.isCombo);
    console.log('Product badge:', product?.badge);
    console.log('Product name:', product?.name);

    if (product?.isCombo === true || product?.badge === 'COMBO') {
      console.log('🎯 COMBO DETECTED! Redirecting to combo page...');
      console.log(
        'Combo check: isCombo =',
        product?.isCombo,
        ', badge =',
        product?.badge
      );
      console.log('Navigating to combo page:', `/combo/${productId}`);
      navigate(`/combo/${productId}`);
    } else {
      console.log('❌ NOT A COMBO - Redirecting to product page...');
      console.log(
        'Combo check: isCombo =',
        product?.isCombo,
        ', badge =',
        product?.badge
      );
      console.log('Navigating to product page:', `/product/${productId}`);
      navigate(`/product/${productId}`);
    }
  };

  // Handle shop now button
  const handleShopNow = () => {
    setIsHeroHidden(true);
    // Scroll to products grid
    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
      productGrid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isLoading = isSearchMode ? searchLoading : productsLoading;
  const error = isSearchMode ? null : productsError; // Don't show errors for search

  return (
    <div className='HomePage'>
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearch={handleSearch}
      />

      <CategoryNavigation
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <HeroSection isHidden={isHeroHidden} onShopNow={handleShopNow} />
      {/*       
      {!isPromoBannerDismissed && (
        <PromoBanner 
          message="🎉 Special Offer: Free shipping on orders over ₹500! Use code FREESHIP500"
          ctaText="Shop Now"
          onCtaClick={handleShopNow}
          dismissible={true}
          onDismiss={handleBannerDismiss} 
        />
      )} */}

      <main className='container'>
        <FilterBar activeSort={activeSort} onSortChange={handleSortChange} />

        <ProductGrid
          products={displayProducts}
          loading={isLoading}
          error={error}
          onProductClick={handleProductClick}
        />
      </main>
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

const AppContent: React.FC = () => {
  return (
    <div className='App'>
      <div className='main-content'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/combo/:id' element={<ComboDetail />} />
          <Route path='/checkout' element={<CheckoutPage />} />

          <Route path='/login' element={<LoginPage />} />
          <Route path='/otp' element={<OtpPage />} />
        </Routes>
      </div>
      <Footer />
      <BottomNavigation />
      <CartModal />
      <WhatsAppWidget />
    </div>
  );
};

export default App;
