// src/context/cart-types.ts
import { CartItem, Product, WeightOption } from '../types';

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalAmount: number;
}

export interface CartContextType extends CartState {
  addToCart: (
    product: Product,
    weight: WeightOption,
    quantity?: number
  ) => void;
  removeFromCart: (productId: number, weight: WeightOption) => void;
  updateQuantity: (
    productId: number,
    weight: WeightOption,
    quantity: number
  ) => void;
  changeWeight: (
    productId: number,
    oldWeight: WeightOption,
    newWeight: WeightOption
  ) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getItemPrice: (product: Product, weight: WeightOption) => number;
}

export type CartAction =
  | {
      type: 'ADD_TO_CART';
      payload: { product: Product; weight: WeightOption; quantity: number };
    }
  | {
      type: 'REMOVE_FROM_CART';
      payload: { productId: number; weight: WeightOption };
    }
  | {
      type: 'UPDATE_QUANTITY';
      payload: { productId: number; weight: WeightOption; quantity: number };
    }
  | {
      type: 'CHANGE_WEIGHT';
      payload: {
        productId: number;
        oldWeight: WeightOption;
        newWeight: WeightOption;
      };
    }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };
