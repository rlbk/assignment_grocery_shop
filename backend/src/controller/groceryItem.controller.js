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
exports.deleteGroceryItem = exports.updateGrocery = exports.getTotalGroceryItem = exports.getGroceryItemById = exports.getAllGroceryItem = exports.createGroceryItem = void 0;
const catchAsyncError_1 = __importDefault(require("../middleware/catchAsyncError"));
const groceryItem_model_1 = __importDefault(require("../model/groceryItem.model"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
// CREATE GROCERY ITEM
exports.createGroceryItem = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, quantity, costPrice, sellingPrice } = req.body;
    if (!name || !quantity || !costPrice || !sellingPrice)
        return next(new ErrorHandler_1.default("All field are required", 400));
    try {
        const newItem = yield groceryItem_model_1.default.create({
            name,
            quantity,
            costPrice,
            sellingPrice,
        });
        res.status(201).json({
            success: true,
            message: "Grocery item created successfully",
            data: newItem,
        });
    }
    catch (error) {
        console.log({ createGroceryIterm: error });
        return next(new ErrorHandler_1.default("Failed to create grocery item", 500));
    }
}));
// GET GROCERY ITEM
exports.getAllGroceryItem = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const page = parseInt((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
    const limit = parseInt((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
    try {
        const count = yield groceryItem_model_1.default.countDocuments();
        const totalPages = Math.ceil(count / limit);
        const skip = (page - 1) * limit;
        const items = yield groceryItem_model_1.default.find().skip(skip).limit(limit);
        res.json({
            success: true,
            totalPages,
            page,
            perPage: limit,
            data: items,
        });
    }
    catch (error) {
        console.log({ getAllGroceryItem: error });
        return next(new ErrorHandler_1.default("Failed to fetch grocery items", 500));
    }
}));
exports.getGroceryItemById = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const itemId = (_c = req.params) === null || _c === void 0 ? void 0 : _c.id;
    try {
        const item = yield groceryItem_model_1.default.findById(itemId);
        if (!item) {
            return next(new ErrorHandler_1.default(`Grocery item with id: ${itemId} not found`, 404));
        }
        res.json({
            success: true,
            data: item,
        });
    }
    catch (error) {
        console.log({ getGroceryItemById: error });
        return next(new ErrorHandler_1.default("Failed to fetch grocery item", 500));
    }
}));
const getTotalGroceryItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield groceryItem_model_1.default.countDocuments();
        res.json({
            success: true,
            total: result,
        });
    }
    catch (error) {
        console.log({ getGroceryItemById: error });
        return next(new ErrorHandler_1.default("Failed to fetch total grocery item", 500));
    }
});
exports.getTotalGroceryItem = getTotalGroceryItem;
// UPDATE GROCERY
exports.updateGrocery = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, quantity, costPrice, sellingPrice } = req.body;
    const itemId = req.params.id;
    try {
        const updatedItem = yield groceryItem_model_1.default.findByIdAndUpdate(itemId, { name, quantity, costPrice, sellingPrice }, { new: true });
        if (!updatedItem) {
            return next(new ErrorHandler_1.default(`Grocery item  with id: ${itemId} not found`, 404));
        }
        res.json({
            success: true,
            message: "Grocery item updated successfully",
            data: updatedItem,
        });
    }
    catch (error) {
        console.log({ updateGrocery: error });
        return next(new ErrorHandler_1.default("Failed to update grocery item", 500));
    }
}));
// DELETE GROCERY ITEM
exports.deleteGroceryItem = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = req.params.id;
    try {
        const deletedItem = yield groceryItem_model_1.default.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return next(new ErrorHandler_1.default(`Grocery item  with id: ${itemId} not found`, 404));
        }
        res.json({
            success: true,
            message: "Grocery item deleted successfully",
        });
    }
    catch (error) {
        console.log({ deleteGroceryItem: error });
        return next(new ErrorHandler_1.default("Failed to delete grocery item", 500));
    }
}));
