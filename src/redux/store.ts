import { configureStore } from "@reduxjs/toolkit";
import filterSidebarReducer from "@/redux/slices/filterSidebarSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      filterSidebar: filterSidebarReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
