import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../middleware/catchAsyncError";

import moment from "moment";
import ErrorHandler from "../utils/ErrorHandler";
import { calculateHighestProfitableItem } from "../services/salesRecord.service";
import salesRecordModel from "../model/salesRecord.model";
import groceryItemModel from "../model/groceryItem.model";
import { Aggregate } from "mongoose";

// CREATE SALES RECORD
export const createSalesRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const itemId = req.params?.itemId;
  try {
    const { quantitySold } = req.body;
    if (!quantitySold)
      return next(
        new ErrorHandler(
          `Cannot add sales record with invalid quantitySold: ${quantitySold}`,
          400
        )
      );

    const groceryItem = await groceryItemModel.findById(itemId);
    if (!groceryItem) {
      return next(
        new ErrorHandler(`Grocery item with id: ${itemId} not found`, 404)
      );
    }

    const totalRevenue = quantitySold * groceryItem.sellingPrice;
    const newSalesRecord = await salesRecordModel.create({
      itemId,
      quantitySold,
      totalRevenue,
    });

    res.status(201).json({
      success: true,
      message: "Sales record added successfully",
      data: newSalesRecord,
    });
  } catch (error) {
    console.log({ createSalesRecord: error });
    return next(new ErrorHandler("Failed to add sales record", 500));
  }
};

// CALCULATE HIGEST PROFITABLE ITEMS
export const calculateHighestProfitableItems = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const timeframe = req.params?.timeframe?.toLowerCase();
    if (timeframe === "day" || timeframe === "week" || timeframe === "month") {
      try {
        const today = new Date();

        const startOfDay = moment(today).startOf(timeframe).toDate();
        const endOfDay = moment(today).endOf(timeframe).toDate();

        // Calculate highest profitable items for daily, weekly, and monthly timeframes
        await calculateHighestProfitableItem(
          startOfDay,
          endOfDay,
          timeframe,
          res
        );
      } catch (error) {
        console.log({ calculateHighestProfitableItems: error });
        return next(
          new ErrorHandler(
            `Error calculating highest profitable items for `,
            500
          )
        );
      }
    } else
      return next(
        new ErrorHandler(
          "Estimation can only be calcuated for day, week or month only.",
          400
        )
      );
  }
);

// GET LATEST SALES
export const getLatestSales = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const latestSale = await salesRecordModel
        .find()
        .populate("itemId")
        .sort({ timestamp: -1 })
        .limit(10);

      res.json({
        success: true,
        data: latestSale,
      });
    } catch (error) {
      console.log({ getLatestSales: error });
      return next(new ErrorHandler("Failed to fetch latest sale", 500));
    }
  }
);

export const getTopFiveHighestSales = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topSales: Aggregate<any[]> = salesRecordModel.aggregate([
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

    const result = await topSales.exec();

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log({ getTopFiveHighestSales: error });
    return next(new ErrorHandler("Failed to fetch top 5 highest sales", 500));
  }
};

export const getTotalSales = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await salesRecordModel.countDocuments();

    res.json({
      success: true,
      total: result,
    });
  } catch (error) {
    console.log({ getTotalSales: error });
    return next(new ErrorHandler("Failed to fetch top 5 highest sales", 500));
  }
};
