"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const salesRecord_controller_1 = require("../controller/salesRecord.controller");
const groceryItem_controller_1 = require("../controller/groceryItem.controller");
const salesRecordRouter = express_1.default.Router();
salesRecordRouter.route("add-record").post(salesRecord_controller_1.createSalesRecord);
salesRecordRouter.route("calculate").get(salesRecord_controller_1.calculateHighestProfitableItems);
salesRecordRouter.route("top-5-sales").get(salesRecord_controller_1.getTopFiveHighestSales);
salesRecordRouter.route("total").get(groceryItem_controller_1.getTotalGroceryItem);
exports.default = salesRecordRouter;
