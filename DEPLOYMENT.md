# SpiceVault React Storefront - Deployment Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   PORT=3002 npm start
   ```

3. **View the application:**
   Open http://localhost:3002 in your browser

## Features Demonstrated

### ✅ Complete API Integration
- **Products API**: Fetches from `/api/items` with fallback to sample data
- **Search API**: Real-time search via `/api/items/search`
- **Categories API**: Dynamic category loading from `/api/categories`
- **Checkout API**: Full order processing via `/api/checkout`
- **Customer API**: Customer management via `/api/customers/storefront`

### ✅ Mobile-First Design
- Responsive grid layout (2-5 columns based on screen size)
- Touch-friendly navigation and interactions
- Sticky headers and smooth scrolling
- Bottom navigation for mobile devices

### ✅ Shopping Cart Features
- Multi-weight product selection (50g, 100g, 200g, 250g, 500g)
- Real-time price calculations
- Persistent cart using localStorage
- Free shipping over ₹1000

### ✅ Advanced Features
- TypeScript for type safety
- Context API for state management
- Custom hooks for API calls
- Error handling and loading states
- Offline mode with sample data

## API Endpoints Used

```
GET  /api/health           - Health check
GET  /api/items            - Get products (with category filtering)
GET  /api/items/:id        - Get single product
GET  /api/items/search     - Search products
GET  /api/items/featured   - Get featured products
GET  /api/categories       - Get categories
POST /api/checkout         - Process orders
GET  /api/customers/storefront  - Get customer
POST /api/customers/storefront - Create customer
PUT  /api/customers/storefront  - Update customer
GET  /api/orders/track     - Track orders
```

## Environment Configuration

Create `.env` file:
```env
REACT_APP_API_BASE_URL=http://localhost:3000/api
REACT_APP_APP_NAME=SpiceVault
REACT_APP_PORT=3002
```

## Testing the Application

### With API Server Running
1. Start your backend API server on port 3000
2. Start the React app: `PORT=3002 npm start`
3. All features will work with live data

### Without API Server (Demo Mode)
1. Start only the React app: `PORT=3002 npm start`
2. App automatically falls back to sample data
3. All UI features work, API calls are simulated

## Project Structure

```
src/
├── components/          # UI Components
│   ├── Header.tsx           # Header with search
│   ├── CategoryNavigation.tsx # Category filters
│   ├── ProductCard.tsx      # Product display
│   ├── ProductGrid.tsx      # Products grid
│   ├── CartModal.tsx        # Shopping cart
│   └── CheckoutModal.tsx    # Checkout flow
├── context/            # State Management
│   └── CartContext.tsx      # Cart state & actions
├── hooks/              # Custom Hooks
│   └── useApi.ts           # API integration hooks
├── services/           # API Layer
│   └── api.ts              # API service with fallbacks
├── types/              # TypeScript Types
│   └── index.ts            # All type definitions
└── data/               # Sample Data
    └── sampleData.ts       # Offline demo data
```

## Key Features Implemented

1. **Product Catalog**
   - Category-based filtering (nuts, spices, herbs, seeds, blends)
   - Weight-based pricing (50g to 500g)
   - Product badges and ratings
   - Search functionality

2. **Shopping Experience**
   - Add to cart with weight selection
   - Real-time cart updates
   - Quantity management
   - Price calculations with shipping

3. **Checkout Process**
   - Customer information form
   - Address collection
   - Order processing via API
   - Success confirmation

4. **Responsive Design**
   - Mobile-first approach
   - Touch-friendly interactions
   - Adaptive grid layouts
   - Sticky navigation elements

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Next Steps

To extend this application:

1. **Add User Authentication**
   - Login/signup flows
   - User profiles
   - Order history

2. **Enhanced Features**
   - Product reviews and ratings
   - Wishlist functionality
   - Advanced search filters

3. **Performance Optimizations**
   - Image lazy loading
   - API response caching
   - Code splitting

4. **Additional Pages**
   - Product detail pages
   - Order tracking
   - User dashboard

## Deployment

For production deployment:

```bash
npm run build
```

Deploy the `build` folder to any static hosting service (Vercel, Netlify, AWS S3, etc.).
