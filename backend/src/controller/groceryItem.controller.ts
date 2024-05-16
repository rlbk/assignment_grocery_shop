import { Request, Response, NextFunction } from "express";
import CatchAsyncError from "../middleware/catchAsyncError";
import groceryItemModel from "../model/groceryItem.model";
import ErrorHandler from "../utils/ErrorHandler";
import { TGroceryItemDto } from "../types/groceryItem.types";

// CREATE GROCERY ITEM
export const createGroceryItem = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, quantity, costPrice, sellingPrice } =
      req.body as TGroceryItemDto;
    if (!name || !quantity || !costPrice || !sellingPrice)
      return next(new ErrorHandler("All field are required", 400));
    try {
      const newItem = await groceryItemModel.create({
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
    } catch (error) {
      console.log({ createGroceryIterm: error });
      return next(new ErrorHandler("Failed to create grocery item", 500));
    }
  }
);

// GET GROCERY ITEM
export const getAllGroceryItem = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query?.page as string) || 1;
    const limit = parseInt(req.query?.limit as string) || 10;
    try {
      const count = await groceryItemModel.countDocuments();
      const totalPages = Math.ceil(count / limit);
      const skip = (page - 1) * limit;

      const items = await groceryItemModel.find().skip(skip).limit(limit);
      res.json({
        success: true,
        totalPages,
        page,
        perPage: limit,
        data: items,
      });
    } catch (error) {
      console.log({ getAllGroceryItem: error });
      return next(new ErrorHandler("Failed to fetch grocery items", 500));
    }
  }
);

export const getGroceryItemById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const itemId = req.params?.id;
    try {
      const item = await groceryItemModel.findById(itemId);
      if (!item) {
        return next(
          new ErrorHandler(`Grocery item with id: ${itemId} not found`, 404)
        );
      }
      res.json({
        success: true,
        data: item,
      });
    } catch (error) {
      console.log({ getGroceryItemById: error });
      return next(new ErrorHandler("Failed to fetch grocery item", 500));
    }
  }
);

export const getTotalGroceryItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await groceryItemModel.countDocuments();

    res.json({
      success: true,
      total: result,
    });
  } catch (error) {
    console.log({ getGroceryItemById: error });
    return next(new ErrorHandler("Failed to fetch total grocery item", 500));
  }
};

// UPDATE GROCERY
export const updateGrocery = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, quantity, costPrice, sellingPrice } =
      req.body as TGroceryItemDto;
    const itemId = req.params.id;
    try {
      const updatedItem = await groceryItemModel.findByIdAndUpdate(
        itemId,
        { name, quantity, costPrice, sellingPrice },
        { new: true }
      );
      if (!updatedItem) {
        return next(
          new ErrorHandler(`Grocery item  with id: ${itemId} not found`, 404)
        );
      }
      res.json({
        success: true,
        message: "Grocery item updated successfully",
        data: updatedItem,
      });
    } catch (error) {
      console.log({ updateGrocery: error });
      return next(new ErrorHandler("Failed to update grocery item", 500));
    }
  }
);

// DELETE GROCERY ITEM
export const deleteGroceryItem = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const itemId = req.params.id;
    try {
      const deletedItem = await groceryItemModel.findByIdAndDelete(itemId);
      if (!deletedItem) {
        return next(
          new ErrorHandler(`Grocery item  with id: ${itemId} not found`, 404)
        );
      }
      res.json({
        success: true,
        message: "Grocery item deleted successfully",
      });
    } catch (error) {
      console.log({ deleteGroceryItem: error });
      return next(new ErrorHandler("Failed to delete grocery item", 500));
    }
  }
);
