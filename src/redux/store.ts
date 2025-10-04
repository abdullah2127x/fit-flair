import { configureStore } from "@reduxjs/toolkit";
import filterSidebarReducer from "@/redux/slices/filterSidebarSlice";
import cartSidebarReducer from "@/redux/slices/cartSidebarSlice";
import cartReducer from "@/redux/slices/cartSlice";
import shippingReducer from "@/redux/slices/shippingSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      cartSidebar: cartSidebarReducer,
      filterSidebar: filterSidebarReducer,
      shipping: shippingReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
