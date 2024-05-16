import { TGroceryItemDto } from "./GroceryItem.type";

export type TSalesRecordDto = {
  _id: string;
  itemId: TGroceryItemDto;
  quantitySold: number;
  salesCount?: number;
  totalRevenue: number;
  timestamp: string;
};

export type THighestProfitableItem = {
  timeframe: string;
  highestProfitableItem: TGroceryItemDto;
  totalRevenue: number;
};
