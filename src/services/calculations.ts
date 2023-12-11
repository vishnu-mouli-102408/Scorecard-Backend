import { fetchCurrentMarketPrice } from "../utils/cmpApi";
import StockService from "./stock-service";

class Calculations {
  stockService: StockService;
  constructor() {
    this.stockService = new StockService();
  }

  async calculateSellRate(id: string) {
    try {
      let sellRate = 0;
      const stockItem = await this.stockService.get(id);
      if (stockItem?.status === "Closed") {
        return;
      }
      const sell = stockItem?.sellRate;
      if (sell) {
        return;
      }
      const buyRate = stockItem?.buyRate;
      const buyRateNumber = this.stockService.extractValue(buyRate!);
      const validity = stockItem?.validity;
      const startTime = stockItem?.startTime;
      const convertedDate = this.stockService.convertTime(startTime!);
      const expirationDate = new Date(
        new Date(convertedDate!).getTime() + validity! * 24 * 60 * 60 * 1000
      );
      const target = stockItem?.target;
      const stopLoss = stockItem?.stopLoss;
      const stockSymbol = this.stockService.extractSymbol(stockItem?.stockName);
      const currentMarketPrice = await fetchCurrentMarketPrice(stockSymbol!);
      if (stockItem?.entryType === "BUY") {
        if (
          currentMarketPrice >= target! ||
          currentMarketPrice <= stopLoss! ||
          new Date() > expirationDate
        ) {
          sellRate = currentMarketPrice;
          let profit_loss = 0;
          let percentage_P_L = 0;
          if (typeof buyRateNumber == "number") {
            profit_loss = parseFloat((sellRate - buyRateNumber!).toFixed(2));
            percentage_P_L = parseFloat(
              ((profit_loss / buyRateNumber) * 100).toFixed(2)
            );
          } else if (typeof buyRateNumber == "object") {
            // let startVal = buyRateNumber !== null ? buyRateNumber[0] : null;
            let endVal = buyRateNumber !== null ? buyRateNumber[1] : null;
            profit_loss = parseFloat((sellRate - endVal!).toFixed(2));
            percentage_P_L = parseFloat(
              ((profit_loss / endVal!) * 100).toFixed(2)
            );
          }
          let exitTime = new Date().toLocaleString();
          await this.stockService.update(id, {
            sellRate: sellRate,
            profit_loss: profit_loss,
            percentage_P_L: percentage_P_L,
            exitTime: exitTime,
            status: "Closed",
          });
        }
      } else if (stockItem?.entryType === "SELL") {
        if (
          currentMarketPrice <= target! ||
          currentMarketPrice >= stopLoss! ||
          new Date() > expirationDate
        ) {
          sellRate = currentMarketPrice;
          let profit_loss = 0;
          let percentage_P_L = 0;
          if (typeof buyRateNumber == "number") {
            profit_loss = parseFloat((sellRate - buyRateNumber!).toFixed(2));
            percentage_P_L = parseFloat(
              ((profit_loss / buyRateNumber) * 100).toFixed(2)
            );
          } else if (typeof buyRateNumber == "object") {
            let startVal = buyRateNumber !== null ? buyRateNumber[0] : null;
            // let endVal = buyRateNumber !== null ? buyRateNumber[1] : null;
            profit_loss = parseFloat((sellRate - startVal!).toFixed(2));
            percentage_P_L = parseFloat(
              ((profit_loss / startVal!) * 100).toFixed(2)
            );
          }
          let exitTime = new Date().toLocaleString();
          await this.stockService.update(id, {
            sellRate: sellRate,
            profit_loss: profit_loss,
            percentage_P_L: percentage_P_L,
            exitTime: exitTime,
            status: "Closed",
          });
        }
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default Calculations;
