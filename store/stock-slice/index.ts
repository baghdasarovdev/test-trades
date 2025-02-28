import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getHistoricalData, getStockData } from "./actions";
import { TStockInfo } from "./types";

interface StockState {
  stocks: TStockInfo[];
  watchList: string[];
  loading: boolean;
  error: string | null;
  historicalDataError: string | null;
  currentPage: number;
  itemsPerPage: number;
  historicalDataLoading: boolean;
}

const initialState: StockState = {
  stocks: [],
  watchList: [],
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 12,
  historicalDataLoading: false,
  historicalDataError: null,
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setStocks: (state, action: PayloadAction<TStockInfo[]>) => {
      state.stocks = action.payload;
    },
    addToWatchList: (state, action: PayloadAction<string>) => {
      if (!state.watchList.includes(action.payload)) {
        state.watchList.push(action.payload);
      }
    },
    removeFromWatchList: (state, action: PayloadAction<string>) => {
      state.watchList = state.watchList.filter(
        (symbol) => symbol !== action.payload
      );
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStockData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getStockData.fulfilled,
        (state, { payload }: PayloadAction<TStockInfo[]>) => {
          state.loading = false;
          state.stocks = payload;
        }
      )
      .addCase(getStockData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getHistoricalData.pending, (state) => {
        state.historicalDataLoading = true;
        state.historicalDataError = null;
      })
      .addCase(getHistoricalData.fulfilled, (state) => {
        state.historicalDataLoading = false;
      })
      .addCase(getHistoricalData.rejected, (state) => {
        state.historicalDataLoading = false;
        state.historicalDataError = "Failed to fetch historical data";
      });
  },
});

export const stockActions = {
  ...stockSlice.actions,
  getStockData,
  getHistoricalData,
};
export const stockReducer = stockSlice.reducer;
