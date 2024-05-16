import { createSlice } from "@reduxjs/toolkit";
import { TGroceryItemDto } from "../../../types/GroceryItem.type";
import {
  addGrocery,
  deleteGrocery,
  getGroceries,
  getTotalGroceries,
  updateGrocery,
} from "./groceryApi";

export interface IGroceryState {
  loading: boolean;
  total: number;
  data: TGroceryItemDto[] | null;
  hasSubmitted: boolean;
  error: any;
}

const initialState: IGroceryState = {
  loading: false,
  total: 0,
  data: null,
  hasSubmitted: false,
  error: null,
};

const grocerySlice = createSlice({
  name: "grocerySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroceries.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGroceries.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data.data;
        state.total = action.payload?.data.total;
      })
      .addCase(getGroceries.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
    builder
      .addCase(addGrocery.pending, (state) => {
        state.hasSubmitted = true;
      })
      .addCase(addGrocery.fulfilled, (state, action) => {
        state.hasSubmitted = false;
        state.data = action.payload;
      })
      .addCase(addGrocery.rejected, (state) => {
        state.hasSubmitted = false;
        state.error = true;
      });
    builder
      .addCase(updateGrocery.pending, (state) => {
        state.hasSubmitted = true;
      })
      .addCase(updateGrocery.fulfilled, (state, action) => {
        state.hasSubmitted = false;
        state.data = action.payload;
      })
      .addCase(updateGrocery.rejected, (state) => {
        state.hasSubmitted = false;
        state.error = true;
      });
    builder
      .addCase(deleteGrocery.pending, (state) => {
        state.hasSubmitted = true;
      })
      .addCase(deleteGrocery.fulfilled, (state, action) => {
        state.hasSubmitted = false;
        state.data = action.payload;
      })
      .addCase(deleteGrocery.rejected, (state) => {
        state.hasSubmitted = false;
        state.error = true;
      });
  },
});

export default grocerySlice.reducer;
