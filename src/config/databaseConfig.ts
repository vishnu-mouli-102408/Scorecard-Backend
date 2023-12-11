import mongoose from "mongoose";
import { MONGO_URL } from "./serverConfig";

export const connect = async () => {
  if (MONGO_URL) {
    await mongoose.connect(MONGO_URL);
  } else {
    console.error("MONGO_URL is undefined. Cannot connect to the database.");
  }
};
