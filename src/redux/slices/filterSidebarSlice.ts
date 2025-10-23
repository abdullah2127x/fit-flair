import { DeviceType } from "@/types/device";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface FilterSidebarState {
  isFilterOpen: boolean;
  openSelects: string[];
  device: DeviceType;
}

const initialState: FilterSidebarState = {
  isFilterOpen: false,
  openSelects: [], // 👈 initially none are open
  device: "desktop", // default value
};

export const selectIsFilterOpen = (state: RootState) =>
  state.filterSidebar.isFilterOpen;

export const selectOpenSelects = (state: RootState) =>
  state.filterSidebar.openSelects;

export const filterSidebarSlice = createSlice({
  name: "filterSidebar",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isFilterOpen = true;
    },
    closeSidebar: (state) => {
      state.isFilterOpen = false;
    },
    toggleSidebar: (state) => {
      state.isFilterOpen = !state.isFilterOpen;
    },
    setDevice: (state, action: PayloadAction<DeviceType>) => {
      state.device = action.payload;
    },
    // 👇 main logic
    toggleSelect: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.openSelects.includes(id)) {
        // if open → close it
        state.openSelects = state.openSelects.filter((s) => s !== id);
      } else {
        // if closed → open it
        state.openSelects.push(id);
      }
    },
  },
});

export const {
  openSidebar,
  closeSidebar,
  toggleSidebar,
  setDevice,
  toggleSelect,
} = filterSidebarSlice.actions;

export default filterSidebarSlice.reducer;
