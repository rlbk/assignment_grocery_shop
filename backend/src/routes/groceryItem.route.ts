import express from "express";
import {
  createGroceryItem,
  deleteGroceryItem,
  getAllGroceryItem,
  getGroceryItemById,
  getTotalGroceryItem,
  updateGrocery,
} from "../controller/groceryItem.controller";

const groceryItemRouter = express.Router();

groceryItemRouter.route("/").post(createGroceryItem).get(getAllGroceryItem);
groceryItemRouter
  .route("/:id")
  .put(updateGrocery)
  .get(getGroceryItemById)
  .delete(deleteGroceryItem);
groceryItemRouter.route("/total").get(getTotalGroceryItem);

export default groceryItemRouter;
