import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import shippingRatesData from "@/data/shippingRates.json";
import { IAddress } from "@/types/user";

// Define types
// interface ShippingAddress {
//   country: string;
//   postalCode: string;
// }

interface ShippingState {
  shippingCost: number;
  shippingAddress: IAddress | null;
  loading: boolean;
  error: string | null;
}

// Load saved state from localStorage
const saved =
  typeof window !== "undefined" ? localStorage.getItem("shippingData") : null;

const initialState: ShippingState = saved
  ? JSON.parse(saved)
  : {
      shippingCost: 0,
      shippingAddress: null,
      loading: false,
      error: null,
    };

// Async thunk to calculate shipping cost
export const calculateShippingCost = createAsyncThunk(
  "shipping/calculateCost",
  async (address: IAddress, { rejectWithValue }) => {
    try {
      // Simulate API call delay (remove in production)
      // await new Promise(resolve => setTimeout(resolve, 300));

      const { country, postalCode } = address;

      // Find country in shipping rates
      const countryData = shippingRatesData.shipping_rates.find(
        (rate) => rate.country.toLowerCase() === country.toLowerCase()
      );

      let shippingCost;

      if (!countryData) {
        shippingCost = shippingRatesData.default_international_rate;

        // Use default international rate if country not found
        // return shippingRatesData.default_international_rate;
      } else {
        const postalCodeRate = (
          countryData.postal_codes as Record<string, number | undefined>
        )[postalCode];
        shippingCost = postalCodeRate ?? countryData.default_rate;
      }
      // ✅ Return both cost and address
      return { shippingCost, shippingAddress: address };
    } catch (error) {
      return rejectWithValue("Failed to calculate shipping cost");
    }
  }
);

// Create the shipping slice
const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    setShippingAddress: (state, action: PayloadAction<IAddress>) => {
      state.shippingAddress = action.payload;
      localStorage.setItem(
        "shippingData",
        JSON.stringify({
          shippingCost: state.shippingCost,
          shippingAddress: state.shippingAddress,
        })
      );
    },
    setShippingCost: (state, action: PayloadAction<number>) => {
      state.shippingCost = action.payload;
      localStorage.setItem(
        "shippingData",
        JSON.stringify({
          shippingCost: state.shippingCost,
          shippingAddress: state.shippingAddress,
        })
      );
    },
    resetShipping: (state) => {
      state.shippingCost = 0;
      state.shippingAddress = null;
      state.error = null;
      localStorage.removeItem("shippingData"); // clear storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculateShippingCost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateShippingCost.fulfilled, (state, action) => {
        state.loading = false;
        state.shippingCost = action.payload.shippingCost;
        state.shippingAddress = action.payload.shippingAddress; // ✅ sets both
        // ✅ Save to localStorage here too
        localStorage.setItem(
          "shippingData",
          JSON.stringify({
            shippingCost: state.shippingCost,
            shippingAddress: state.shippingAddress,
          })
        );
      })
      .addCase(calculateShippingCost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { setShippingAddress, setShippingCost, resetShipping } =
  shippingSlice.actions;

// Export selectors
export const selectShippingCost = (state: RootState) =>
  state.shipping.shippingCost;
export const selectShippingAddress = (state: RootState) =>
  state.shipping.shippingAddress;
export const selectShippingLoading = (state: RootState) =>
  state.shipping.loading;
export const selectShippingError = (state: RootState) => state.shipping.error;

export default shippingSlice.reducer;
