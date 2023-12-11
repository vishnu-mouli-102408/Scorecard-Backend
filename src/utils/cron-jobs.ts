import cron from "node-cron";
import Calculations from "../services/calculations";
import StockService from "../services/stock-service";

let calculations = new Calculations();
let stockService = new StockService();

export const setupJobs = () => {
  cron.schedule("* * * * *", async () => {
    const stocksData = await stockService.getAll();
    stocksData.forEach(async (singleData) => {
      await calculations.calculateSellRate(singleData.id);
    });
  });
};
