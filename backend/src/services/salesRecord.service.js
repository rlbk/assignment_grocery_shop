"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateHighestProfitableItem = void 0;
const salesRecord_model_1 = __importDefault(require("../model/salesRecord.model"));
const calculateHighestProfitableItem = (startTime, endTime, timeframe, res) => __awaiter(void 0, void 0, void 0, function* () {
    const salesRecords = yield salesRecord_model_1.default.find({
        timestamp: { $gte: startTime, $lte: endTime },
    });
    const groupedSales = {};
    salesRecords.forEach((record) => {
        const itemIdString = record.itemId.toString();
        if (!groupedSales[itemIdString]) {
            groupedSales[itemIdString] = 0;
        }
        groupedSales[itemIdString] += record.totalRevenue;
    });
    let highestRevenue = 0;
    let highestProfitableItemId = "";
    for (const itemId in groupedSales) {
        if (groupedSales[itemId] > highestRevenue) {
            highestRevenue = groupedSales[itemId];
            highestProfitableItemId = itemId;
        }
    }
    res.json({
        success: true,
        timeframe,
        highestProfitableItemId,
        totalRevenue: highestRevenue,
    });
});
exports.calculateHighestProfitableItem = calculateHighestProfitableItem;
