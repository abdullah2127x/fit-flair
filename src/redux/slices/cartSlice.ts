// redux/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ICartItem } from "@/types/cart";
import { RootState } from "@/redux/store";

const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + (item.quantity ?? 1), 0);

const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) =>
      total +
      (item.price - (item.price * item.discount) / 100) * (item.quantity ?? 1),
    0
  );

// Load from localStorage
const loadCart = (): ICartItem[] => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  }
  return [];
};

// Save to localStorage
const saveCart = (items: ICartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(items));
  }
};

interface CartState {
  items: ICartItem[];
}

const initialState: CartState = {
  items: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const newItem = {
        ...action.payload,
        quantity: action.payload.quantity ?? 1,
      };

      // Check if same product + same color already exists
      const existing = state.items.find(
        (i) =>
          i.productId === newItem.productId && i.colorName === newItem.colorName
      );

      if (existing) {
        existing.quantity = (existing.quantity ?? 1) + newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      saveCart(state.items);
    },

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
      saveCart(state.items);
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

      saveCart(state.items);
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
        if ((item.quantity ?? 1) > 1) {
          item.quantity = (item.quantity ?? 1) + 1;
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

      saveCart(state.items);
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

      saveCart(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveCart(state.items);
    },
  },
});

export { selectCartCount, selectCartSubtotal };

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
