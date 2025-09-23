// redux/slices/cartSidebarSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface CartSidebarState {
  isOpen: boolean;
}

const initialState: CartSidebarState = {
  isOpen: false,
};

const cartSidebarSlice = createSlice({
  name: "cartSidebar",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isOpen = true;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openSidebar, closeSidebar, toggleSidebar } = cartSidebarSlice.actions;
export default cartSidebarSlice.reducer;
