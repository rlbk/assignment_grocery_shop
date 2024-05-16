"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const GroceryItemSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    costPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
});
const groceryItemModel = mongoose_1.default.model("GroceryItem", GroceryItemSchema);
exports.default = groceryItemModel;
