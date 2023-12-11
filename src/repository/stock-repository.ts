import Stock from "../models/inputStock";
import { StockSchema } from "../utils/inputStock";

class StockRepository {
  async create(data: StockSchema) {
    try {
      const response = await Stock.create(data);
      return response;
    } catch (error) {
      console.log("Error occurred in Repository Layer");
      throw error;
    }
  }

  async destroy(id: String) {
    try {
      const response = await Stock.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log("Error occurred in Repository Layer");
      throw error;
    }
  }

  async update(id: String, data: Partial<StockSchema>) {
    try {
      const response = await Stock.findByIdAndUpdate(id, data, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log("Error occurred in Repository Layer");
      throw error;
    }
  }

  async get(id: String) {
    try {
      const response = await Stock.findById(id);
      return response;
    } catch (error) {
      console.log("Error occurred in Repository Layer");
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await Stock.find({});
      return response;
    } catch (error) {
      console.log("Error occurred in Repository Layer");
      throw error;
    }
  }
}

export default StockRepository;
