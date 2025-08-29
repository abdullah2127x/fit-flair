'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, CartItem, CartContextType, ProductVariant } from '@/lib/types';

type CartAction = 
  | { type: 'ADD_TO_CART'; product: Product; variant: ProductVariant; size?: string }
  | { type: 'REMOVE_FROM_CART'; productId: string; colorName: string; size?: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; colorName: string; quantity: number; size?: string }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.find(item => 
        item.product.id === action.product.id && 
        item.variant.colorName === action.variant.colorName &&
        item.selectedSize === action.size
      );
      
      if (existingItem) {
        return state.map(item =>
          item.product.id === action.product.id && 
          item.variant.colorName === action.variant.colorName &&
          item.selectedSize === action.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...state, { 
        product: action.product, 
        variant: action.variant,
        quantity: 1, 
        selectedSize: action.size
      }];

    case 'REMOVE_FROM_CART':
      return state.filter(item => 
        !(item.product.id === action.productId && 
          item.variant.colorName === action.colorName &&
          item.selectedSize === action.size)
      );

    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return state.filter(item => 
          !(item.product.id === action.productId && 
            item.variant.colorName === action.colorName &&
            item.selectedSize === action.size)
        );
      }
      
      return state.map(item =>
        item.product.id === action.productId && 
        item.variant.colorName === action.colorName &&
        item.selectedSize === action.size
          ? { ...item, quantity: action.quantity }
          : item
      );

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product: Product, variant: ProductVariant, size?: string) => {
    dispatch({ type: 'ADD_TO_CART', product, variant, size });
  };

  const removeFromCart = (productId: string, colorName: string, size?: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId, colorName, size });
  };

  const updateQuantity = (productId: string, colorName: string, quantity: number, size?: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, colorName, quantity, size });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const total = items.reduce((sum, item) => {
    const discountedPrice = item.product.discount 
      ? item.product.price * (1 - item.product.discount / 100)
      : item.product.price;
    return sum + (discountedPrice * item.quantity);
  }, 0);
  
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}