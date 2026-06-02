import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, CartAction } from '../types';

interface CartState {
  items: CartItem[];
}

interface CartContextType extends CartState {
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number, color: string, size: string) => void;
  updateQuantity: (productId: number, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const initialState: CartState = {
  items: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        const item = updatedItems[existingItemIndex];
        const newQty = Math.min(item.quantity + action.payload.quantity, item.maxStock);
        updatedItems[existingItemIndex] = { ...item, quantity: newQty };
        return { items: updatedItems };
      }

      return { items: [...state.items, action.payload] };
    }

    case 'REMOVE_ITEM': {
      return {
        items: state.items.filter(
          (item) =>
            !(item.productId === action.payload.productId &&
              item.color === action.payload.color &&
              item.size === action.payload.size)
        ),
      };
    }

    case 'UPDATE_QUANTITY': {
      return {
        items: state.items.map((item) => {
          if (
            item.productId === action.payload.productId &&
            item.color === action.payload.color &&
            item.size === action.payload.size
          ) {
            return { ...item, quantity: action.payload.quantity };
          }
          return item;
        }),
      };
    }

    case 'CLEAR_CART':
      return { items: [] };

    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'pdp-cart-storage';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addToCart = (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item });
  
  const removeFromCart = (productId: number, color: string, size: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, color, size } });
    
  const updateQuantity = (productId: number, color: string, size: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, color, size, quantity } });
    
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
