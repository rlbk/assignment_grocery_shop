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

groceryItemRouter.route("/total/count").get(getTotalGroceryItem);
groceryItemRouter.route("/").post(createGroceryItem).get(getAllGroceryItem);
groceryItemRouter
  .route("/:id")
  .put(updateGrocery)
  .get(getGroceryItemById)
  .delete(deleteGroceryItem);

export default groceryItemRouter;
