import express from "express";
import {
  calculateHighestProfitableItems,
  createSalesRecord,
  getLatestSales,
  getTopFiveHighestSales,
} from "../controller/salesRecord.controller";
import { getTotalGroceryItem } from "../controller/groceryItem.controller";

const salesRecordRouter = express.Router();

salesRecordRouter.route("/add-record").post(createSalesRecord);
salesRecordRouter.route("/calculate").get(calculateHighestProfitableItems);
salesRecordRouter.route("/top-5-sales").get(getTopFiveHighestSales);
salesRecordRouter.route("/latest").get(getLatestSales);
salesRecordRouter.route("/total").get(getTotalGroceryItem);

export default salesRecordRouter;
