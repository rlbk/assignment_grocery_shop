import mongoose, { Document, Schema, Model } from "mongoose";

interface IGroceryItem extends Document {
  name: string;
  quantity: number;
  costPrice: number;
  sellingPrice: number;
}

const GroceryItemSchema: Schema<IGroceryItem> = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  costPrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
});

const groceryItemModel: Model<IGroceryItem> = mongoose.model(
  "GroceryItem",
  GroceryItemSchema
);
export default groceryItemModel;
