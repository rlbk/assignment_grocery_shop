import { Response } from "express";
import salesRecordModel from "../model/salesRecord.model";
import groceryItemModel from "../model/groceryItem.model";

export const calculateHighestProfitableItem = async (
  startTime: Date,
  endTime: Date,
  timeframe: string,
  res: Response
) => {
  const salesRecords = await salesRecordModel.find({
    timestamp: { $gte: startTime, $lte: endTime },
  });

  const groupedSales: { [itemId: string]: number } = {};
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
    highestProfitableItem: await groceryItemModel.findById(
      highestProfitableItemId
    ),
    totalRevenue: highestRevenue,
  });
};
