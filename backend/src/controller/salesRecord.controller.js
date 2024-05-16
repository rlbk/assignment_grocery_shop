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
exports.getTotalSales = exports.getTopFiveHighestSales = exports.getLatestSales = exports.calculateHighestProfitableItems = exports.createSalesRecord = void 0;
const catchAsyncError_1 = __importDefault(require("../middleware/catchAsyncError"));
const moment_1 = __importDefault(require("moment"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const salesRecord_service_1 = require("../services/salesRecord.service");
const salesRecord_model_1 = __importDefault(require("../model/salesRecord.model"));
const groceryItem_model_1 = __importDefault(require("../model/groceryItem.model"));
// CREATE SALES RECORD
const createSalesRecord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const itemId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.itemId;
    try {
        const { quantitySold } = req.body;
        if (!quantitySold)
            return next(new ErrorHandler_1.default(`Cannot add sales record with invalid quantitySold: ${quantitySold}`, 400));
        const groceryItem = yield groceryItem_model_1.default.findById(itemId);
        if (!groceryItem) {
            return next(new ErrorHandler_1.default(`Grocery item with id: ${itemId} not found`, 404));
        }
        const totalRevenue = quantitySold * groceryItem.sellingPrice;
        const newSalesRecord = yield salesRecord_model_1.default.create({
            itemId,
            quantitySold,
            totalRevenue,
        });
        res.status(201).json({
            success: true,
            message: "Sales record added successfully",
            data: newSalesRecord,
        });
    }
    catch (error) {
        console.log({ createSalesRecord: error });
        return next(new ErrorHandler_1.default("Failed to add sales record", 500));
    }
});
exports.createSalesRecord = createSalesRecord;
// CALCULATE HIGEST PROFITABLE ITEMS
exports.calculateHighestProfitableItems = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const timeframe = (_c = (_b = req.params) === null || _b === void 0 ? void 0 : _b.timeframe) === null || _c === void 0 ? void 0 : _c.toLowerCase();
    if (timeframe === "day" || timeframe === "week" || timeframe === "month") {
        try {
            const today = new Date();
            const startOfDay = (0, moment_1.default)(today).startOf(timeframe).toDate();
            const endOfDay = (0, moment_1.default)(today).endOf(timeframe).toDate();
            // Calculate highest profitable items for daily, weekly, and monthly timeframes
            yield (0, salesRecord_service_1.calculateHighestProfitableItem)(startOfDay, endOfDay, timeframe, res);
        }
        catch (error) {
            console.log({ calculateHighestProfitableItems: error });
            return next(new ErrorHandler_1.default(`Error calculating highest profitable items for `, 500));
        }
    }
    else
        return next(new ErrorHandler_1.default("Estimation can only be calcuated for day, week or month only.", 400));
}));
// GET LATEST SALES
exports.getLatestSales = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latestSale = yield salesRecord_model_1.default
            .find()
            .populate("itemId")
            .sort({ timestamp: -1 })
            .limit(10);
        res.json({
            success: true,
            data: latestSale,
        });
    }
    catch (error) {
        console.log({ getLatestSales: error });
        return next(new ErrorHandler_1.default("Failed to fetch latest sale", 500));
    }
}));
const getTopFiveHighestSales = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topSales = salesRecord_model_1.default.aggregate([
            {
                $group: {
                    _id: "$itemId",
                    totalRevenue: { $sum: "$totalRevenue" },
                },
            },
            {
                $sort: { totalRevenue: -1 },
            },
            {
                $limit: 5,
            },
            {
                $lookup: {
                    from: "GroceryItem",
                    localField: "itemId",
                    foreignField: "_id",
                    as: "itemId",
                },
            },
        ]);
        const result = yield topSales.exec();
        res.json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log({ getTopFiveHighestSales: error });
        return next(new ErrorHandler_1.default("Failed to fetch top 5 highest sales", 500));
    }
});
exports.getTopFiveHighestSales = getTopFiveHighestSales;
const getTotalSales = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield salesRecord_model_1.default.countDocuments();
        res.json({
            success: true,
            total: result,
        });
    }
    catch (error) {
        console.log({ getTotalSales: error });
        return next(new ErrorHandler_1.default("Failed to fetch top 5 highest sales", 500));
    }
});
exports.getTotalSales = getTotalSales;
