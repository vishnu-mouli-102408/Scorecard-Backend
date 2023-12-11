import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    stockName: {
      type: String,
      required: true,
    },
    exchange: {
      type: String,
      required: true,
    },
    entryType: {
      type: String,
      required: true,
    },
    rate_range: {
      type: String,
      required: true,
    },
    current_market_price: {
      type: Number,
      required: true,
    },
    target: {
      type: Number,
      required: true,
    },
    stopLoss: {
      type: Number,
      required: true,
    },
    validity: {
      type: Number,
      required: true,
    },
    buyRate: {
      type: String,
    },
    sellRate: {
      type: Number,
    },
    profit_loss: {
      type: Number,
    },
    percentage_P_L: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
    startTime: {
      type: String,
    },
    exitTime: {
      type: String,
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;
