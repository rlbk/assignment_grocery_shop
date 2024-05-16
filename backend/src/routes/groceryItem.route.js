"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const groceryItem_controller_1 = require("../controller/groceryItem.controller");
const groceryItemRouter = express_1.default.Router();
groceryItemRouter.route("/").post(groceryItem_controller_1.createGroceryItem).get(groceryItem_controller_1.getAllGroceryItem);
groceryItemRouter
    .route("/:id")
    .put(groceryItem_controller_1.updateGrocery)
    .get(groceryItem_controller_1.getGroceryItemById)
    .delete(groceryItem_controller_1.deleteGroceryItem);
groceryItemRouter.route("/total").get(groceryItem_controller_1.getTotalGroceryItem);
exports.default = groceryItemRouter;
