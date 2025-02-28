import { useEffect, useState, useRef } from "react";

export function useStockWebSocket(stocks: { symbol: string }[]) {
  const [livePrices, setLivePrices] = useState<{ [key: string]: number }>({});
  const socketRef = useRef<WebSocket | null>(null);
  const isConnected = useRef(false);

  useEffect(() => {
    if (!stocks.length) return;

    const socket = new WebSocket(
      `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
    );
    socketRef.current = socket;

    socket.addEventListener("open", () => {
      console.log("✅ WebSocket connected");
      isConnected.current = true;

      stocks.forEach((stock, index) => {
        setTimeout(() => {
          socket.send(
            JSON.stringify({ type: "subscribe", symbol: stock.symbol })
          );
          console.log(`Subscribed to ${stock.symbol}`);
        }, index * 100);
      });
    });

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data?.data) {
        const updatedPrices = data.data.reduce(
          (acc: Record<string, string>, item: Record<string, string>) => {
            acc[item.s] = item.p;
            return acc;
          },
          {}
        );
        setLivePrices((prev) => ({ ...prev, ...updatedPrices }));
      }
    });

    socket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    socket.addEventListener("close", () => {
      console.log("WebSocket closed");
      isConnected.current = false;
    });
  }, [stocks]);

  return livePrices;
}
