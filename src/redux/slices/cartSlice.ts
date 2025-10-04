// redux/slices/cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { ICartItem } from "@/types/cart";
import { RootState } from "@/redux/store";

import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
  clearCartFromLocalStorage,
} from "@/utilityFunctions/cartFunctions";

// =======================================
// SELECTORS
// =======================================
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + (item.quantity ?? 1), 0);

export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) =>
      total +
      (item.price - (item.price * item.discount) / 100) * (item.quantity ?? 1),
    0
  );

// =======================================
// STATE
// =======================================
interface CartState {
  items: ICartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: loadCartFromLocalStorage(), // fallback for guests
  loading: false,
  error: null,
};

// =======================================
// SLICE
// =======================================

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // from local
    addToCart(state, action: PayloadAction<ICartItem>) {
      const newItem = {
        ...action.payload,
        quantity: action.payload.quantity ?? 1,
      };

      const existing = state.items.find(
        (i) =>
          i.productId === newItem.productId && i.colorName === newItem.colorName
      );

      if (existing) {
        existing.quantity = (existing.quantity ?? 1) + newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      saveCartToLocalStorage(state.items);
    },

    // from local
    removeFromCart: (
      state,
      action: PayloadAction<{ productId: string; colorName: string }>
    ) => {
      state.items = state.items.filter(
        (i) =>
          !(
            i.productId === action.payload.productId &&
            i.colorName === action.payload.colorName
          )
      );
      saveCartToLocalStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      // saveCartToLocalStorage(state.items);

      clearCartFromLocalStorage();
      // Reset flag after a short delay
    },

    setCart: (state, action: PayloadAction<ICartItem[]>) => {
      state.items = action.payload;
      // keep localStorage updated for guests
      localStorage.setItem("cart", JSON.stringify(action.payload));
    },
    decreaseQuantity: (
      state,
      action: PayloadAction<{ productId: string; colorName: string }>
    ) => {
      const item = state.items.find(
        (i) =>
          i.productId === action.payload.productId &&
          i.colorName === action.payload.colorName
      );

      if (item) {
        if ((item.quantity ?? 1) > 1) {
          item.quantity = (item.quantity ?? 1) - 1;
        } else {
          state.items = state.items.filter(
            (i) =>
              !(
                i.productId === action.payload.productId &&
                i.colorName === action.payload.colorName
              )
          );
        }
      }

      saveCartToLocalStorage(state.items);
    },

    increaseQuantity: (
      state,
      action: PayloadAction<{ productId: string; colorName: string }>
    ) => {
      const item = state.items.find(
        (i) =>
          i.productId === action.payload.productId &&
          i.colorName === action.payload.colorName
      );

      if (item) {
        item.quantity = (item.quantity ?? 1) + 1;
      }

      saveCartToLocalStorage(state.items);
    },

    setQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        colorName: string;
        quantity: number;
      }>
    ) => {
      const item = state.items.find(
        (i) =>
          i.productId === action.payload.productId &&
          i.colorName === action.payload.colorName
      );

      if (item) {
        item.quantity = action.payload.quantity;
      }

      saveCartToLocalStorage(state.items);
    },
  },
});

// =======================================
// Add this to the exports section at the bottom of the file
export const {
  addToCart,
  removeFromCart,
  clearCart,
  setCart,
  decreaseQuantity,
  increaseQuantity,
  setQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
