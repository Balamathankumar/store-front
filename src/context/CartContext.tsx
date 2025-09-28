import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';
import { CartItem, Product, WeightOption } from '../types';
import ApiService from '../services/api';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalAmount: number;
}

interface CartContextType extends CartState {
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

type CartAction =
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

const CartContext = createContext<CartContextType | undefined>(undefined);

const getItemPrice = (product: Product, weight: WeightOption): number => {
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

const cartReducer = (state: CartState, action: CartAction): CartState => {
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
          {
            id: product.id,
            quantity,
            weight,
            product,
          },
        ];
      }

      const { totalItems, totalAmount } = calculateTotals(newItems);
      const newState = {
        ...state,
        items: newItems,
        totalItems,
        totalAmount,
      };

      ApiService.saveCart(newItems);
      return newState;
    }

    case 'REMOVE_FROM_CART': {
      const { productId, weight } = action.payload;
      const newItems = state.items.filter(
        (item) => !(item.id === productId && item.weight === weight)
      );

      const { totalItems, totalAmount } = calculateTotals(newItems);
      const newState = {
        ...state,
        items: newItems,
        totalItems,
        totalAmount,
      };

      ApiService.saveCart(newItems);
      return newState;
    }

    case 'UPDATE_QUANTITY': {
      const { productId, weight, quantity } = action.payload;
      const newItems = state.items
        .map((item) => {
          if (item.id === productId && item.weight === weight) {
            return { ...item, quantity: Math.max(0, quantity) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);

      const { totalItems, totalAmount } = calculateTotals(newItems);
      const newState = {
        ...state,
        items: newItems,
        totalItems,
        totalAmount,
      };

      ApiService.saveCart(newItems);
      return newState;
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
            .map((item) => {
              if (item.id === productId && item.weight === newWeight) {
                return {
                  ...item,
                  quantity: item.quantity + itemToChange.quantity,
                };
              }
              return item;
            })
            .filter(
              (item) => !(item.id === productId && item.weight === oldWeight)
            );
        } else {
          newItems = state.items;
        }
      } else {
        newItems = state.items.map((item) => {
          if (item.id === productId && item.weight === oldWeight) {
            return { ...item, weight: newWeight };
          }
          return item;
        });
      }

      const { totalItems, totalAmount } = calculateTotals(newItems);
      const newState = {
        ...state,
        items: newItems,
        totalItems,
        totalAmount,
      };

      ApiService.saveCart(newItems);
      return newState;
    }

    case 'CLEAR_CART':
      ApiService.clearCart();
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalAmount: 0,
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case 'LOAD_CART': {
      const items = action.payload;
      const { totalItems, totalAmount } = calculateTotals(items);
      return {
        ...state,
        items,
        totalItems,
        totalAmount,
      };
    }

    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  isOpen: false,
  totalItems: 0,
  totalAmount: 0,
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = ApiService.getCartFromStorage();
    if (savedCart.length > 0) {
      dispatch({ type: 'LOAD_CART', payload: savedCart });
    }
  }, []);

  const addToCart = (
    product: Product,
    weight: WeightOption,
    quantity: number = 1
  ) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, weight, quantity } });
  };

  const removeFromCart = (productId: number, weight: WeightOption) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, weight } });
  };

  const updateQuantity = (
    productId: number,
    weight: WeightOption,
    quantity: number
  ) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, weight, quantity },
    });
  };

  const changeWeight = (
    productId: number,
    oldWeight: WeightOption,
    newWeight: WeightOption
  ) => {
    dispatch({
      type: 'CHANGE_WEIGHT',
      payload: { productId, oldWeight, newWeight },
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const value: CartContextType = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    changeWeight,
    clearCart,
    toggleCart,
    getItemPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
