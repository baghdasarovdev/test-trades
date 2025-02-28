import { createAsyncThunk } from "@reduxjs/toolkit";
import { STOCK_SERVICE } from "./services";
import { AxiosError } from "axios";
import { TStockHistoricalParams } from "./types";

export const getStockData = createAsyncThunk(
  "stock/getStockData",
  async (body: { symbol: string }, { rejectWithValue }) => {
    try {
      const response = await STOCK_SERVICE.getStockData(body.symbol);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ msg: string }>;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getHistoricalData = createAsyncThunk(
  "stock/getHistoricalData",
  async (body: TStockHistoricalParams, { rejectWithValue }) => {
    try {
      const response = await STOCK_SERVICE.getHistoricalData(body);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ msg: string }>;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
