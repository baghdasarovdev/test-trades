import { useAppDispatch, useAppSelector } from "@/store";
import { stockActions } from "@/store/stock-slice";
import { useEffect, useState } from "react";

interface HistoricalData {
  date: string;
  price: number;
}

export const useHistoricalData = (
  symbol: string,
  from: string,
  to: string,
  interval = "1/day"
) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.stock.historicalDataLoading);
  const error = useAppSelector((state) => state.stock.historicalDataError);

  const [data, setData] = useState<HistoricalData[]>([]);

  useEffect(() => {
    if (!symbol) return;

    const fetchData = async () => {
      await dispatch(
        stockActions.getHistoricalData({ symbol, from, to, interval })
      )
        .unwrap()
        .then((data) => {
          setData(data);
        });
    };

    fetchData();
  }, [symbol, from, to, interval]);

  return { data, loading, error };
};
