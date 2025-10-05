// src/context/cart-reducer.ts
import { CartState, CartAction } from './cart-types';
import { Product, WeightOption, CartItem } from '../types';
import ApiService from '../services/api';

export const getItemPrice = (
  product: Product,
  weight: WeightOption
): number => {
  if (product.isCombo) {
    return product.price || product.retailPrice;
  }

  if (product.prices && typeof product.prices === 'object') {
    const priceFromDict = product.prices[weight.toString()];
    if (priceFromDict !== undefined) {
      return priceFromDict;
    }
  }

  switch (weight) {
    case 50:
      return product.price50g || Math.round(product.retailPrice * 0.5);
    case 100:
      return product.price100g || product.retailPrice;
    case 200:
      return product.price200g || Math.round(product.retailPrice * 1.8);
    case 250:
      return product.price250g || Math.round(product.retailPrice * 2.2);
    case 500:
      return product.price500g || Math.round(product.retailPrice * 4);
    default:
      return product.retailPrice;
  }
};

const calculateTotals = (
  items: CartItem[]
): { totalItems: number; totalAmount: number } => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => {
    if (item.product) {
      const price = getItemPrice(item.product, item.weight as WeightOption);
      return sum + price * item.quantity;
    }
    return sum;
  }, 0);

  return { totalItems, totalAmount };
};

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, weight, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === product.id && item.weight === weight
      );

      let newItems: CartItem[];
      if (existingItemIndex >= 0) {
        newItems = [...state.items];
        newItems[existingItemIndex].quantity += quantity;
      } else {
        newItems = [
          ...state.items,
          { id: product.id, quantity, weight, product },
        ];
      }

      const { totalItems, totalAmount } = calculateTotals(newItems);
      ApiService.saveCart(newItems);

      return { ...state, items: newItems, totalItems, totalAmount };
    }

    case 'REMOVE_FROM_CART': {
      const { productId, weight } = action.payload;
      const newItems = state.items.filter(
        (item) => !(item.id === productId && item.weight === weight)
      );

      const { totalItems, totalAmount } = calculateTotals(newItems);
      ApiService.saveCart(newItems);

      return { ...state, items: newItems, totalItems, totalAmount };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, weight, quantity } = action.payload;
      const newItems = state.items
        .map((item) =>
          item.id === productId && item.weight === weight
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        )
        .filter((item) => item.quantity > 0);

      const { totalItems, totalAmount } = calculateTotals(newItems);
      ApiService.saveCart(newItems);

      return { ...state, items: newItems, totalItems, totalAmount };
    }

    case 'CHANGE_WEIGHT': {
      const { productId, oldWeight, newWeight } = action.payload;
      const existingItemWithNewWeight = state.items.find(
        (item) => item.id === productId && item.weight === newWeight
      );

      let newItems: CartItem[];

      if (existingItemWithNewWeight) {
        const itemToChange = state.items.find(
          (item) => item.id === productId && item.weight === oldWeight
        );

        if (itemToChange) {
          newItems = state.items
            .map((item) =>
              item.id === productId && item.weight === newWeight
                ? { ...item, quantity: item.quantity + itemToChange.quantity }
                : item
            )
            .filter(
              (item) => !(item.id === productId && item.weight === oldWeight)
            );
        } else {
          newItems = state.items;
        }
      } else {
        newItems = state.items.map((item) =>
          item.id === productId && item.weight === oldWeight
            ? { ...item, weight: newWeight }
            : item
        );
      }

      const { totalItems, totalAmount } = calculateTotals(newItems);
      ApiService.saveCart(newItems);

      return { ...state, items: newItems, totalItems, totalAmount };
    }

    case 'CLEAR_CART':
      ApiService.clearCart();
      return { ...state, items: [], totalItems: 0, totalAmount: 0 };

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };

    case 'LOAD_CART': {
      const items = action.payload;
      const { totalItems, totalAmount } = calculateTotals(items);
      return { ...state, items, totalItems, totalAmount };
    }

    default:
      return state;
  }
};

export const initialState: CartState = {
  items: [],
  isOpen: false,
  totalItems: 0,
  totalAmount: 0,
};
