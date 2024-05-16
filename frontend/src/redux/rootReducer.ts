import { combineReducers } from "@reduxjs/toolkit";
import grocerySlice from "./features/grocery-item/grocerySlice";
import salesSlice from "./features/sales/salesSlice";

const rootReducer = combineReducers({
  groceryReducer: grocerySlice,
  salesReducer: salesSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
