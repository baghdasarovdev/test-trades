"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { stockActions } from "@/store/stock-slice";
import Card from "./UI/card";
import { FaCheck } from "react-icons/fa";
import { useStockWebSocket } from "@/hooks/use-stock-web-socket";
import useSession from "@/hooks/use-session";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/constants";

export default function StockList() {
  const router = useRouter();
  const stocks = useAppSelector((state) => state.stock.stocks);
  const watchList = useAppSelector((state) => state.stock.watchList);
  const dispatch = useAppDispatch();
  const livePrices = useStockWebSocket(stocks);

  const currentPage = useAppSelector((state) => state.stock.currentPage);
  const itemsPerPage = useAppSelector((state) => state.stock.itemsPerPage);

  const totalPages = Math.ceil(stocks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStocks = stocks.slice(startIndex, startIndex + itemsPerPage);
  const isInWatchList = (ticker: string) => watchList.includes(ticker);

  const { session } = useSession();

  if (currentStocks.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-7">
        No stocks available to display
      </p>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Stock Prices (Live)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentStocks?.map((stock) => (
          <Card
            key={stock.displaySymbol}
            title={`${stock.symbol} - ${stock.description}`}
            className={"flex flex-col justify-between"}
          >
            <p className="text-gray-700 dark:text-gray-300">
              Live Price:{" "}
              <span className="font-semibold">
                {livePrices[stock.symbol] ?? "Loading..."}
              </span>
            </p>

            {session ? (
              <button
                onClick={() => {
                  if (!isInWatchList(stock.symbol)) {
                    dispatch(stockActions.addToWatchList(stock.symbol));
                  }
                }}
                disabled={isInWatchList(stock.symbol)}
                className="mt-2 w-full bg-green-500 disabled:cursor-not-allowed hover:bg-green-600 text-white py-2 rounded transition-all disabled:bg-gray-400"
              >
                {isInWatchList(stock.symbol) ? (
                  <span className="flex justify-center items-center">
                    <FaCheck className="mr-2" /> Added
                  </span>
                ) : (
                  "Add to Watchlist"
                )}
              </button>
            ) : (
              <button
                onClick={() => router.push(ROUTES.login)}
                className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-all"
              >
                Please log in to add to Watchlist
              </button>
            )}
          </Card>
        ))}
      </div>

      {currentStocks.length ? (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={() =>
              dispatch(
                stockActions.setCurrentPage(Math.max(currentPage - 1, 1))
              )
            }
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded disabled:opacity-50"
          >
            ←
          </button>
          <span className="text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              dispatch(
                stockActions.setCurrentPage(
                  Math.min(currentPage + 1, totalPages)
                )
              )
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded disabled:opacity-50"
          >
            →
          </button>
        </div>
      ) : null}
    </div>
  );
}
