import axios from 'axios';
import { Product, SearchResponse, FeaturedResponse, Customer, ItemsResponse, HealthResponse } from '../types';
import { sampleProducts } from '../data/sampleData';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api/storefront';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false, // Disable credentials for CORS simplicity
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 5000, // 5 second timeout
});

// Add request interceptor to handle CORS preflight
api.interceptors.request.use(
  (config) => {
    // Add any additional headers if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle CORS errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
      console.warn('CORS or network error detected, falling back to sample data');
      // This will be caught by the try-catch blocks in the API methods
    }
    return Promise.reject(error);
  }
);

export class ApiService {
  // Health check
  static async checkHealth(): Promise<HealthResponse> {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.warn('API health check failed, using offline mode');
      return {
        status: 'offline',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        stats: {
          items: sampleProducts.length,
          orders: 0,
          customers: 0
        }
      };
    }
  }

  // Products
  static async getProducts(params?: {
    category?: 'NUT' | 'DRY FRUIT' | 'SPICE' | 'SEEDS';
    subCategory?: string;
    featured?: boolean;
    search?: string;
    sortBy?: 'name' | 'price' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
  }): Promise<ItemsResponse> {
    try {
      const response = await api.get('/items', { params });
      return response.data;
    } catch (error) {
      console.warn('API unavailable, using sample data');
      let products = sampleProducts;
      
      if (params?.category) {
        products = products.filter(p => p.category === params.category);
      }
      
      if (params?.featured) {
        products = products.filter(p => p.badge === 'BESTSELLER' || p.badge === 'HOT');
      }
      
      if (params?.search) {
        const query = params.search.toLowerCase();
        products = products.filter(p => 
          p.name.toLowerCase().includes(query) ||
          (p.description && p.description.toLowerCase().includes(query)) ||
          p.category.toLowerCase().includes(query)
        );
      }
      
      if (params?.limit) {
        products = products.slice(0, params.limit);
      }
      
      return {
        items: products,
        pagination: {
          total: products.length,
          limit: params?.limit || 20,
          offset: params?.offset || 0,
          hasMore: false
        },
        filters: {
          categories: {
            'NUT': ['Almonds', 'Cashews', 'Walnuts'],
            'SPICE': ['Turmeric', 'Cumin', 'Coriander'],
            'DRY FRUIT': ['Dates', 'Raisins', 'Figs'],
            'SEEDS': ['Chia', 'Flax', 'Sunflower']
          }
        }
      };
    }
  }

  static async getProduct(id: number): Promise<Product> {
    try {
      const response = await api.get(`/items/${id}`);
      return response.data;
    } catch (error) {
      const product = sampleProducts.find(p => p.id === id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    }
  }

  static async getCombo(id: number): Promise<Product> {
    try {
      const response = await api.get(`/combos/${id}`);
      return response.data;
    } catch (error) {
      const combo = sampleProducts.find(p => p.id === id && p.isCombo === true);
      if (!combo) {
        throw new Error('Combo not found');
      }
      return combo;
    }
  }

  static async searchProducts(params: {
    q: string;
    category?: 'NUT' | 'DRY FRUIT' | 'SPICE' | 'SEEDS';
    limit?: number;
    offset?: number;
  }): Promise<SearchResponse> {
    try {
      const response = await api.get('/items/search', { params });
      return response.data;
    } catch (error) {
      const query = params.q.toLowerCase();
      let filteredProducts = sampleProducts.filter(product => 
        product.name.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query)) ||
        product.category.toLowerCase().includes(query)
      );

      if (params.category) {
        filteredProducts = filteredProducts.filter(p => p.category === params.category);
      }

      const limit = params.limit || 50;
      const offset = params.offset || 0;
      const items = filteredProducts.slice(offset, offset + limit);

      return {
        items,
        pagination: {
          total: filteredProducts.length,
          limit,
          offset,
          hasMore: offset + limit < filteredProducts.length
        }
      };
    }
  }

  static async getFeaturedProducts(): Promise<FeaturedResponse> {
    try {
      const response = await api.get('/items/featured');
      return response.data;
    } catch (error) {
      const featured = sampleProducts.filter(p => p.badge === 'BESTSELLER' || p.badge === 'HOT').slice(0, 4);
      const bestsellers = sampleProducts.filter(p => (p.rating || 0) >= 4.7).slice(0, 4);
      
      return {
        featured,
        bestsellers
      };
    }
  }

  // Categories
  static async getCategories(): Promise<string[]> {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      return ['NUT', 'DRY FRUIT', 'SPICE', 'SEEDS'];
    }
  }

  // Cart Management
  static async getCart(params?: {
    sessionId?: string;
    customerId?: number;
  }): Promise<{ items: any[]; total: number }> {
    try {
      const response = await api.get('/cart', { params });
      return response.data;
    } catch (error) {
      // Fallback to localStorage
      const cartData = localStorage.getItem('spiceVault_cart');
      const items = cartData ? JSON.parse(cartData) : [];
      const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
      return { items, total };
    }
  }

  static async addToCart(params: {
    itemId: number;
    quantity: number;
    sessionId?: string;
  }): Promise<any> {
    try {
      const response = await api.post('/cart', params);
      return response.data;
    } catch (error) {
      // Fallback to localStorage
      const cartData = localStorage.getItem('spiceVault_cart');
      const items = cartData ? JSON.parse(cartData) : [];
      items.push(params);
      localStorage.setItem('spiceVault_cart', JSON.stringify(items));
      return { success: true };
    }
  }

  static getCartFromStorage(): any[] {
    const cartData = localStorage.getItem('spiceVault_cart');
    return cartData ? JSON.parse(cartData) : [];
  }

  static saveCart(cartItems: any[]): void {
    localStorage.setItem('spiceVault_cart', JSON.stringify(cartItems));
  }

  static clearCart(): void {
    localStorage.removeItem('spiceVault_cart');
  }

  // Checkout
  static async createOrder(orderData: {
    customerId: number;
    items: Array<{
      itemId: number;
      quantity: number;
      price: number;
    }>;
    shippingAddress: {
      name: string;
      address: string;
      city: string;
      postalCode: string;
    };
  }): Promise<{ orderId: string; status: string; total: number }> {
    try {
      const response = await api.post('/checkout', orderData);
      return response.data;
    } catch (error) {
      // Simulate order creation for demo
      const orderId = `ORD-${Date.now()}-DEMO`;
      const total = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        orderId,
        status: 'confirmed',
        total
      };
    }
  }

  // Customer Management
  static async getCustomer(params: {
    email?: string;
  }): Promise<Customer> {
    try {
      const response = await api.get('/customers', { params });
      return response.data;
    } catch (error) {
      throw new Error('Customer not found');
    }
  }

  static async createCustomer(customerData: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  }): Promise<Customer> {
    try {
      const response = await api.post('/customers', customerData);
      return response.data;
    } catch (error) {
      // Simulate customer creation
      return {
        ...customerData,
        id: Date.now()
      } as Customer;
    }
  }

  // Order Tracking
  static async trackOrder(params: {
    orderId: string;
  }): Promise<any> {
    try {
      const response = await api.get('/orders/track', { params });
      return response.data;
    } catch (error) {
      return {
        orderId: params.orderId,
        status: 'not_found',
        message: 'Order not found'
      };
    }
  }
}

export default ApiService;
