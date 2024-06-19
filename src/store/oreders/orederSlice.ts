import { createSlice } from "@reduxjs/toolkit";
import actPlaceOreder from "./act/actPlaceOreder";
import actGetOrders from "./act/actGetOrders";
import { TOrderItem, TLoading, isString } from "@types";

interface IOrdersState {
  ordersList: TOrderItem[];
  loading: TLoading;
  error: string | null;
}

const initialState: IOrdersState = {
  ordersList: [],
  loading: "idle",
  error: null,
};

const orederSlice = createSlice({
  name: "oreder",
  initialState,
  reducers: {
    resetOrderStatus: (state) => {
      state.loading = "idle";
      state.error = null;
      state.ordersList = [];
    },
  },
  extraReducers: (builder) => {
    // place oreder
    builder.addCase(actPlaceOreder.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actPlaceOreder.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actPlaceOreder.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    // get oreders
    builder.addCase(actGetOrders.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetOrders.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.ordersList = Array.isArray(action.payload) ? action.payload : [];
    });
    builder.addCase(actGetOrders.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { resetOrderStatus } = orederSlice.actions;
export { actPlaceOreder, actGetOrders };
export default orederSlice.reducer;
