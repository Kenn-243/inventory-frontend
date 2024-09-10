import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import itemSlice from "./item/itemSlice";

export const rootReducer = combineReducers({
  user: userSlice,
  item: itemSlice,
});
