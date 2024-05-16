import express from "express";
import {
  calculateHighestProfitableItems,
  createSalesRecord,
  getTopFiveHighestSales,
} from "../controller/salesRecord.controller";

const salesRecordRouter = express.Router();

salesRecordRouter.route("add-record").post(createSalesRecord);
salesRecordRouter.route("calculate").get(calculateHighestProfitableItems);
salesRecordRouter.route("top-5-sales").get(getTopFiveHighestSales);

export default salesRecordRouter;
