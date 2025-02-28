import StockList from "@/components/stock-list";
import StockSearch from "@/components/stock-search";

export default function Home() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <StockSearch />
      <StockList />
    </main>
  );
}
