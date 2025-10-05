// src/context/cart-context.tsx
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';
import { CartContextType } from './cart-types';
import { cartReducer, initialState, getItemPrice } from './cart-reducer';
import ApiService from '../services/api';

const CartContext = createContext<CartContextType | undefined>(undefined);

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

  const addToCart = (product: any, weight: any, quantity: number = 1) =>
    dispatch({ type: 'ADD_TO_CART', payload: { product, weight, quantity } });

  const removeFromCart = (productId: any, weight: any) =>
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, weight } });

  const updateQuantity = (productId: any, weight: any, quantity: any) =>
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, weight, quantity },
    });

  const changeWeight = (productId: any, oldWeight: any, newWeight: any) =>
    dispatch({
      type: 'CHANGE_WEIGHT',
      payload: { productId, oldWeight, newWeight },
    });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });

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
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
