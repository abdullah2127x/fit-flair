import { DeviceType } from "@/types/device";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterSidebarState {
  isFilterOpen: boolean;
  device: DeviceType;
}

const initialState: FilterSidebarState = {
  isFilterOpen: false,
  device: "desktop", // default value
};

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
  },
});

export const { openSidebar, closeSidebar, toggleSidebar, setDevice } =
  filterSidebarSlice.actions;

export default filterSidebarSlice.reducer;
