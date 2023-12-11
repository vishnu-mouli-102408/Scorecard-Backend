import { Request, Response } from "express";
import StockService from "../services/stock-service";
import { inputStockSchema } from "../utils/inputStock";
import { fetchCurrentMarketPrice } from "../utils/cmpApi";

const stockService = new StockService();

export const create = async (req: Request, res: Response) => {
  try {
    const buyRate = req.body.rate_range;
    const startTime = new Date().toLocaleString();
    let validatedData = inputStockSchema.safeParse({
      ...req.body,
      buyRate: buyRate,
      startTime: startTime,
    });
    if (!validatedData.success) {
      const validationError = validatedData.error.errors;
      console.log(validationError);
    } else {
      const response = await stockService.create(validatedData.data);
      return res.status(200).json({
        data: response,
        success: true,
        error: {},
        message: "Successfully Created ",
      });
    }
  } catch (error) {
    console.log("Something went wrong");
    return res.status(500).json({
      data: {},
      success: false,
      error: error,
      message: "Can't create data",
    });
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const response = await stockService.destroy(req.params.id);
    return res.status(200).json({
      data: response,
      success: true,
      error: {},
      message: "Successfully Deleted",
    });
  } catch (error) {
    console.log("Something went wrong");
    return res.status(500).json({
      data: {},
      success: false,
      error: error,
      message: "Can't Delete data",
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const response = await stockService.update(req.params.id, req.body);
    return res.status(200).json({
      data: response,
      success: true,
      error: {},
      message: "Successfully Updated",
    });
  } catch (error) {
    console.log("Something went wrong");
    return res.status(500).json({
      data: {},
      success: false,
      error: error,
      message: "Can't Update data",
    });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const response = await stockService.get(req.params.id);
    return res.status(200).json({
      data: response,
      success: true,
      error: {},
      message: "Successfully Feteched",
    });
  } catch (error) {
    console.log("Something went wrong");
    return res.status(500).json({
      data: {},
      success: false,
      error: error,
      message: "Can't Ftech data",
    });
  }
};

export const getCurrentMarketPrice = async (req: Request, res: Response) => {
  try {
    const response = await fetchCurrentMarketPrice(req.params.symbol);
    return res.status(200).json({
      data: response,
      success: true,
      error: {},
      message: "Successfully Fetched",
    });
  } catch (error) {
    console.log("Something went wrong");
    return res.status(500).json({
      data: {},
      success: false,
      error: error,
      message: "Can't fetch CMP",
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const response = await stockService.getAll();
    return res.status(200).json({
      data: response,
      success: true,
      error: {},
      message: "Successfully Fetched",
    });
  } catch (error) {
    console.log("Something went wrong");
    return res.status(500).json({
      data: {},
      success: false,
      error: error,
      message: "Can't fetch data",
    });
  }
};
