import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "../../../plugin/http";
import { TGroceryItemDto } from "../../../types/GroceryItem.type";

export const getGroceries = createAsyncThunk(
  "getGroceries",
  async (any, thunkApi) => {
    try {
      const res = await GetRequest(`/grocery`);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getTotalGroceries = createAsyncThunk(
  "getTotalGroceries",
  async (any, thunkApi) => {
    try {
      const res = await GetRequest(`/grocery/total`);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addGrocery = createAsyncThunk(
  "addGrocery",
  async (data: TGroceryItemDto, thunkApi) => {
    try {
      const res = await PostRequest("/grocery", data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateGrocery = createAsyncThunk(
  "updateGrocery",
  async (data: TGroceryItemDto, thunkApi) => {
    try {
      const res = await PutRequest(`/grocery/${data._id}`, data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const deleteGrocery = createAsyncThunk(
  "deleteGrocery",
  async (id: string, thunkApi) => {
    try {
      const res = await DeleteRequest(`/grocery/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
