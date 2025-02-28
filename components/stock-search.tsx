"use client";

import { useAppDispatch } from "@/store";
import { stockActions } from "@/store/stock-slice";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/use-debounce";

export default function StockSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (debouncedQuery) {
      dispatch(stockActions.setCurrentPage(1));
      dispatch(stockActions.getStockData({ symbol: debouncedQuery }));
    }
  }, [debouncedQuery, dispatch]);

  return (
    <motion.div
      className="flex space-x-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <input
        type="text"
        placeholder="Search stock symbol (e.g., AAPL)"
        className="border p-2 rounded flex-grow text-black"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </motion.div>
  );
}
