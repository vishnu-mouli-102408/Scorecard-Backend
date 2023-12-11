import express from "express";
import bodyParser from "body-parser";
import { PORT } from "./config/serverConfig";
import { connect } from "./config/databaseConfig";
import cors from "cors";
import axios from "axios";

import apiRoutes from "./routes/index";
import StockService from "./services/stock-service";
import { setupJobs } from "./utils/cron-jobs";

const setUpAndStartServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cors());

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`);
    await connect();
    console.log("MongoDB Connected");

    setupJobs();
  });
};

setUpAndStartServer();
