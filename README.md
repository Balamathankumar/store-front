# SpiceVault React Storefront

A modern, mobile-first React application for the SpiceVault storefront built with TypeScript and integrated with the backend API.

## Features

- ✅ **Mobile-First Design**: Responsive design optimized for mobile devices
- ✅ **Product Catalog**: Browse products by categories (Nuts, Spices, Herbs, Seeds, Blends)
- ✅ **Search Functionality**: Search products with real-time filtering
- ✅ **Shopping Cart**: Add/remove items with weight selection and quantity management
- ✅ **API Integration**: Full integration with backend API endpoints
- ✅ **Offline Mode**: Fallback to sample data when API is unavailable
- ✅ **TypeScript**: Full type safety and better development experience
- ✅ **State Management**: Context API for cart and application state
- ✅ **Loading States**: Proper loading indicators and error handling

## Technologies Used

- **React 19** with TypeScript
- **Axios** for API calls
- **Context API** for state management
- **CSS3** with custom properties for theming
- **Responsive Design** with CSS Grid and Flexbox

## API Integration

The application integrates with the following API endpoints:

### Products
- `GET /api/storefront/items` - Get all products with filtering
- `GET /api/storefront/items/:id` - Get single product
- `GET /api/storefront/items/search` - Search products
- `GET /api/storefront/items/featured` - Get featured products

### Categories
- `GET /api/storefront/categories` - Get all categories

### Cart & Checkout
- `POST /api/checkout` - Process orders
- Cart management via localStorage

### Customer Management
- `GET /api/customers/storefront` - Get customer by email/phone
- `POST /api/customers/storefront` - Create customer
- `PUT /api/customers/storefront` - Update customer

### Order Tracking
- `GET /api/orders/track` - Track orders

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Configuration

The app expects the backend API to be running on `http://localhost:3000`. If the API is not available, the app will automatically fall back to sample data for demonstration purposes.

To change the API base URL, update the `API_BASE_URL` constant in `src/services/api.ts`.

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx
│   ├── CategoryNavigation.tsx
│   ├── HeroSection.tsx
│   ├── FilterBar.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── CartModal.tsx
│   └── BottomNavigation.tsx
├── context/            # React Context providers
│   └── CartContext.tsx
├── hooks/              # Custom React hooks
│   └── useApi.ts
├── services/           # API service layer
│   └── api.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── data/               # Sample data for offline mode
│   └── sampleData.ts
├── App.tsx             # Main application component
├── App.css             # Global styles
└── index.tsx           # Application entry point
```

## Features in Detail

### Mobile-First Design
- Responsive grid layout (2 columns on mobile, up to 5 on desktop)
- Touch-friendly navigation
- Sticky header and navigation elements
- Bottom navigation for mobile devices

### Product Management
- Multi-weight pricing (50g, 100g, 200g, 250g, 500g)
- Product badges and ratings
- Category-based filtering
- Search functionality with debouncing

### Shopping Cart
- Persistent cart using localStorage
- Real-time price calculations
- Weight-based pricing
- Free shipping over ₹1000

### State Management
- Cart state managed via React Context
- Optimistic updates for better UX
- Error handling and loading states

## Environment Variables

Create a `.env` file in the root directory for configuration:

```env
REACT_APP_API_BASE_URL=http://localhost:3000/api/storefront
REACT_APP_APP_NAME=SpiceVault
```

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

## Deployment

The app can be deployed to any static hosting service:

1. Build the app:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your hosting service.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
