import express from "express";
import {
  calculateHighestProfitableItems,
  createSalesRecord,
} from "../controller/salesRecord.controller";

const salesRecordRouter = express.Router();

salesRecordRouter.route("add-record").post(createSalesRecord);
salesRecordRouter.route("calculate").get(calculateHighestProfitableItems);

export default salesRecordRouter;
