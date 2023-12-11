import { NseIndia } from "stock-nse-india";
const nseIndia = new NseIndia();

export async function fetchCurrentMarketPrice(symbol: string): Promise<number> {
  try {
    const details = await nseIndia.getEquityDetails(symbol);

    if (details.priceInfo && typeof details.priceInfo.lastPrice === "number") {
      return details.priceInfo.lastPrice;
    } else {
      throw new Error("Invalid price information");
    }
  } catch (err) {
    console.error(err);
    throw err; // rethrow the error or handle it accordingly
  }
}
