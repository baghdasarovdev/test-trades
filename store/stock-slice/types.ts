export type TStockInfo = {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
};

export type TStockHistoricalParams = {
  symbol: string;
  from: string;
  to: string;
  interval: string;
};
