import { NseIndia } from "stock-nse-india";
const nseIndia = new NseIndia();

export async function fetchCurrentMarketPrice(symbol: string): Promise<number> {
  try {
    console.log("Hitting the fetchCurrentMarketPrice Function")
    const details = await nseIndia.getEquityDetails(symbol);
    console.log("details",details)

    if (details.priceInfo && typeof details.priceInfo.lastPrice === "number") {
      return details.priceInfo.lastPrice;
      console.log("PRICE",details.priceInfo.lastPrice)
    } else {
      console.log("Error")    
      throw new Error("Invalid price information");
    }
  } catch (err) {
    console.log("ERR")
    console.error(err);
    throw err; // rethrow the error or handle it accordingly
  }
}
