# API Integration

This React app is now integrated with the backend API at `http://localhost:3000/api/items`.

## API Endpoints Used

- `GET /api/items` - Fetch all products
- `GET /api/items/:id` - Fetch a single product by ID
- `GET /api/items/search?q=query` - Search products (optional)

## Features

### ✅ API Integration
- **Dynamic product loading** from backend API
- **Error handling** with fallback to static data
- **Loading states** for better UX
- **Product search** via API (with client-side fallback)

### 🔄 Fallback Strategy
If the API is unavailable, the app gracefully falls back to static data to ensure the app continues working.

### 📱 User Experience
- Loading spinners during API calls
- Error messages with retry options
- Smooth transitions between states

## Running the App

1. **Start the backend API** (make sure it's running on port 3000)
2. **Start the React app**:
   ```bash
   cd spice-vault-react
   PORT=3003 npm start
   ```

The app will be available at `http://localhost:3003`

## API Data Format

The app expects the API to return products in this format:

```typescript
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: 'nuts' | 'spices' | 'herbs' | 'seeds' | 'blends' | 'organic';
  badge?: string;
  emoji: string;
  prices: {
    50: number;
    100: number;
    200: number;
    250: number;
    500: number;
  };
}
```
