"use client";

import React, { memo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useHistoricalData } from "@/hooks/use-historical-data";

interface Props {
  symbol: string;
  from: string;
  to: string;
}

const StockChart = ({ symbol, from, to }: Props) => {
  const { data, loading, error } = useHistoricalData(symbol, from, to);

  if (loading) {
    return (
      <div className="text-center">
        <div
          className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-blue-600"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <p>📡 Loading data...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip
          contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          labelStyle={{ color: "#ffffff" }}
          itemStyle={{ color: "#60A5FA" }}
        />
        <Line type="monotone" dataKey="price" stroke="#2563EB" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default memo(StockChart);
