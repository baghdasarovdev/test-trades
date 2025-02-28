import { APIS } from "@/config/apis";
import axiosInstance from "@/config/axios";
import { TStockHistoricalParams } from "./types";

export const STOCK_SERVICE = {
  getStockData: (symbol: string) =>
    axiosInstance(`${APIS.getStockData}?symbol=${symbol}`),
  getHistoricalData: (params: TStockHistoricalParams) =>
    axiosInstance(APIS.getHistoricalData, {
      params,
    }),
};
