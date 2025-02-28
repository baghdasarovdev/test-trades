"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { stockActions } from "@/store/stock-slice";
import { useState, ChangeEvent } from "react";
import StockChart from "./historical-chart";
import Card from "./UI/card";

export default function WatchList() {
  const [dateRange, setDateRange] = useState({
    from: "2023-01-01",
    to: "2024-01-01",
  });
  const { from, to } = dateRange;

  const watchList = useAppSelector((state) => state.stock.watchList);
  const dispatch = useAppDispatch();

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDateRange((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRemove = (symbol: string) => {
    dispatch(stockActions.removeFromWatchList(symbol));
  };

  return (
    <div className="mt-4">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Stock Historical Data
        </h1>
        <div className="flex justify-center gap-6 mb-6">
          <div className="flex flex-col items-center">
            <label htmlFor="from" className="text-lg font-semibold mb-2">
              From
            </label>
            <input
              id="from"
              type="date"
              value={from}
              onChange={handleDateChange}
              className="border px-4 py-2 rounded-md text-black focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="to" className="text-lg font-semibold mb-2">
              To
            </label>
            <input
              id="to"
              type="date"
              value={to}
              onChange={handleDateChange}
              className="border px-4 py-2 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
          Your Watchlist
        </h2>
        {watchList.length === 0 ? (
          <p className="text-gray-500 text-center">
            No stocks added to the watchlist.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {watchList.map((symbol) => (
              <Card key={symbol} className="flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-semibold text-gray-800 dark:text-white">
                    {symbol}
                  </span>
                  <button
                    onClick={() => handleRemove(symbol)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
                  >
                    Remove
                  </button>
                </div>
                <StockChart symbol={symbol} from={from} to={to} />
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
