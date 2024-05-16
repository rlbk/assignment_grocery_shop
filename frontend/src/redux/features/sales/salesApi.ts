import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetRequest, PostRequest } from "../../../plugin/http";

export const addSales = createAsyncThunk(
  "addSales",
  async (data: { itemId: string; quantitySold: number }, thunkApi) => {
    try {
      const res = await PostRequest("/sales/add-record", data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getTotalSales = createAsyncThunk(
  "getTotalSales",
  async (any, thunkApi) => {
    try {
      const res = await GetRequest(`/sales/total`);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getTopFiveSales = createAsyncThunk(
  "getTopFilveSales",
  async (any, thunkApi) => {
    try {
      const res = await GetRequest(`/sales/top-5-sales`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getLatestSales = createAsyncThunk(
  "getLatestSales",
  async (any, thunkApi) => {
    try {
      const res = await GetRequest(`/sales/latest`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getHighestProfitableItem = createAsyncThunk(
  "getHighestProfitableItem",
  async ({ timeframe }: { timeframe: string }, thunkApi) => {
    try {
      const res = await GetRequest(`/sales/calculate`, {
        params: { timeframe },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
