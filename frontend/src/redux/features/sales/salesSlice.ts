import { createSlice } from "@reduxjs/toolkit";
import {
  addSales,
  getHighestProfitableItem,
  getLatestSales,
  getTopFiveSales,
  getTotalSales,
} from "./salesApi";
import {
  THighestProfitableItem,
  TSalesRecordDto,
} from "../../../types/salesRecord.types";

export interface ISalesState {
  loading: boolean;
  total: number;
  hasSubmitted: boolean;
  highestProfitItem: THighestProfitableItem | null;
  topFive: TSalesRecordDto[] | null;
  latestSales: TSalesRecordDto[] | null;
  error: any;
}

const initialState: ISalesState = {
  loading: false,
  total: 0,
  hasSubmitted: false,
  highestProfitItem: null,
  topFive: null,
  latestSales: null,
  error: null,
};

const salesSlice = createSlice({
  name: "salesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSales.pending, (state) => {
        state.hasSubmitted = true;
      })
      .addCase(addSales.fulfilled, (state, action) => {
        state.hasSubmitted = false;
      })
      .addCase(addSales.rejected, (state) => {
        state.hasSubmitted = false;
        state.error = true;
      });
    builder
      .addCase(getTotalSales.pending, (state) => {
        state.hasSubmitted = true;
      })
      .addCase(getTotalSales.fulfilled, (state, action) => {
        state.hasSubmitted = false;
        state.total = action.payload?.data.total;
      })
      .addCase(getTotalSales.rejected, (state) => {
        state.hasSubmitted = false;
        state.error = true;
      });
    builder
      .addCase(getTopFiveSales.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTopFiveSales.fulfilled, (state, action) => {
        state.loading = false;
        state.topFive = action.payload.data;
      })
      .addCase(getTopFiveSales.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
    builder
      .addCase(getLatestSales.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLatestSales.fulfilled, (state, action) => {
        state.loading = false;
        state.latestSales = action.payload.data;
      })
      .addCase(getLatestSales.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
    builder
      .addCase(getHighestProfitableItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHighestProfitableItem.fulfilled, (state, action) => {
        state.loading = false;
        state.highestProfitItem = action.payload;
      })
      .addCase(getHighestProfitableItem.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default salesSlice.reducer;
