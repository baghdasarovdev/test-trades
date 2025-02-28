import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_POLYGON_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_POLYGON_API_KEY;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get("symbol");
    const interval = searchParams.get("interval") || "day";
    const from = searchParams.get("from") || "2023-01-01";
    const to = searchParams.get("to") || "2024-01-01";

    if (!symbol) {
      return NextResponse.json(
        { error: "Stock symbol is required" },
        { status: 400 }
      );
    }

    const response = await axios.get(
      `${BASE_URL}/aggs/ticker/${symbol}/range/${interval}/${from}/${to}?apiKey=${API_KEY}`
    );

    const data =
      response.data.results?.map((day: { t: string; c: string }) => ({
        date: new Date(day.t).toISOString().split("T")[0],
        price: day.c,
      })) || [];

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return NextResponse.json(
      { error: "Failed to fetch historical data" },
      { status: 500 }
    );
  }
}
