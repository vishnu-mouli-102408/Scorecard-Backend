import StockRepository from "../repository/stock-repository";
import { fetchCurrentMarketPrice } from "../utils/cmpApi";
import { StockSchema } from "../utils/inputStock";

class StockService {
  stockRepository: StockRepository;
  constructor() {
    this.stockRepository = new StockRepository();
  }

  async create(data: StockSchema) {
    try {
      const response = await this.stockRepository.create(data);
      return response;
    } catch (error) {
      console.log("Error occured in Service Layer");
      throw error;
    }
  }

  async destroy(id: String) {
    try {
      const response = await this.stockRepository.destroy(id);
      return response;
    } catch (error) {
      console.log("Error occured in Service Layer");
      throw error;
    }
  }

  async update(id: String, data: Partial<StockSchema>) {
    try {
      const response = await this.stockRepository.update(id, data);
      return response;
    } catch (error) {
      console.log("Error occurred in Service Layer");
      throw error;
    }
  }

  async get(id: String) {
    try {
      const response = await this.stockRepository.get(id);
      return response;
    } catch (error) {
      console.log("Error occured in Service Layer");
      throw error;
    }
  }

  async getAll() {
    try {
      const response = this.stockRepository.getAll();
      return response;
    } catch (error) {
      console.log("Error occured in Service Layer");
      throw error;
    }
  }

  extractValue(input: string): number[] | null | number {
    const rateMatch = /^(\d+(\.\d+)?)$/.exec(input);
    if (rateMatch) {
      return parseFloat(rateMatch[0]);
    }

    const rangeMatch = /^(\d+(\.\d+)?)\s*-\s*(\d+(\.\d+)?)$/.exec(input);
    if (rangeMatch) {
      const start = parseFloat(rangeMatch[1]);
      const end = parseFloat(rangeMatch[3]);
      return [start, end];
    }

    return null;
  }

  extractSymbol(stockName: string | undefined): string | null {
    try {
      if (!stockName) {
        return null;
      }
      const match = /-\s*([A-Za-z0-9]+)$/.exec(stockName);
      if (match) {
        return match[1];
      }
      return null;
    } catch (error) {
      console.log("Can't parse Symbol");
      throw error;
    }
  }

  convertTime(startTime: string) {
    // console.log("TIME", startTime);
    if (startTime !== undefined) {
      const [datePart, timePart] = startTime.split(", ");
      const [day, month, year] = datePart.split("/");
      const [hours, minutes, seconds] = timePart.split(":");
      const convertedDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hours),
        Number(minutes),
        Number(seconds)
      );
      return convertedDate;
    }
  }
}

export default StockService;
