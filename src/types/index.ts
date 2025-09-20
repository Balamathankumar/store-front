export interface ComboItem {
  quantityInGrams: number;
  item: {
    id: number;
    name: string;
    subCategory?: string | null;
    category: 'NUT' | 'DRY FRUIT' | 'SPICE' | 'SEEDS';
    imageUrl?: string | null;
    imageFilenames?: string[]; // Array of image filenames for uploads path
  };
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  retailPrice: number;
  price200g?: number | null;
  price500g?: number | null;
  price250g?: number | null;
  price100g?: number | null;
  price50g?: number | null;
  category: 'NUT' | 'DRY FRUIT' | 'SPICE' | 'SEEDS';
  subCategory?: string | null;
  quantity?: number;
  unit?: string;
  imageUrl?: string | null;
  imageFilenames?: string[]; // Array of image filenames for uploads path
  isActive?: boolean;
  createdAt?: string;
  supplier?: {
    id: number;
    name: string;
  } | null;
  prices?: {
    [key: string]: number;
  };
  // Combo-specific fields
  sku?: string;
  price?: number;
  totalCost?: number;
  isCombo?: boolean;
  items?: ComboItem[];
  // Legacy fields for backwards compatibility
  emoji?: string;
  badge?: string;
  rating?: number;
  reviews?: number;
  originalPrice?: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  weight: number;
  product?: Product;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
}

export interface Customer {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
  };
}

export interface Order {
  id?: number;
  orderId?: string;
  status: string;
  totalAmount: number;
  shippingAmount: number;
  customer: Customer;
  items: OrderItem[];
  shippingAddress?: Address;
  paymentMethod: string;
  notes?: string;
  createdAt?: string;
  statusHistory?: OrderStatusHistory[];
}

export interface OrderItem {
  id?: number;
  itemId: number;
  quantity: number;
  grams: number;
  price?: number;
  item?: Product;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderStatusHistory {
  status: string;
  description: string;
  timestamp: string;
  completed: boolean;
  isCurrent: boolean;
}

export interface Category {
  name: string;
  count: number;
  emoji: string;
}

export interface SearchResponse {
  items: Product[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface ItemsResponse {
  items: Product[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
  filters: {
    categories: CategoryFilters;
  };
}

export interface CategoryFilters {
  [key: string]: string[];
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  database: string;
  stats: {
    items: number;
    orders: number;
    customers: number;
  };
}

export interface ApiError {
  error: string;
  message: string;
}

export interface FeaturedResponse {
  featured: Product[];
  bestsellers: Product[];
}

export type WeightOption = 50 | 100 | 200 | 250 | 500;

export interface FilterOptions {
  category: string;
  sortBy: string;
  searchQuery: string;
}
