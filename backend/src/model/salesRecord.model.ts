import mongoose, { Document, Schema, Model, Types } from "mongoose";

interface ISalesRecord extends Document {
  itemId: Types.ObjectId;
  quantitySold: number;
  totalRevenue: number;
  timestamp: Date;
}

const SalesRecordSchema: Schema<ISalesRecord> = new mongoose.Schema({
  itemId: { type: Schema.Types.ObjectId, ref: "GroceryItem", required: true },
  quantitySold: { type: Number, required: true },
  totalRevenue: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const salesRecordModel: Model<ISalesRecord> = mongoose.model(
  "SalesRecord",
  SalesRecordSchema
);

export default salesRecordModel;
