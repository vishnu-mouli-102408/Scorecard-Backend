import express from "express";
const router = express.Router();

import {
  create,
  destroy,
  get,
  getAll,
  getCurrentMarketPrice,
  update,
} from "../../controllers/stock-controller";

router.post("/stocks", create);
router.get("/stock/:id", get);
router.get("/stocks", getAll);
router.delete("/stock/:id", destroy);
router.patch("/stock/:id", update);
router.get("/cmp/:symbol", getCurrentMarketPrice);

export default router;
