import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ItemModel } from "../../models/itemModel";

export const fetchItem = createAsyncThunk(
  "item/fetchItem",
  async (userId: number) => {
    try {
      const result = await axios.get(
        "http://localhost:8000/GetItemByUserId/" + userId
      );
      if (result != null) {
        const itemDataResult: ItemModel[] = [];
        result.data.map((x: any) => {
          itemDataResult.push({
            itemId: x.itemId,
            itemName: x.itemName,
            userId: x.userId,
          });
        });
        return itemDataResult;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
) as any;

export const createItem = createAsyncThunk(
  "item/createItem",
  async (itemData: ItemModel) => {
    try {
      const result = await axios.post(
        "http://localhost:8000/CreateItem",
        itemData
      );
      return result.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
) as any;

export const updateItem = createAsyncThunk(
  "item/updateItem",
  async (itemData: ItemModel) => {
    try {
      const result = await axios.put(
        "http://localhost:8000/UpdateItem/" + itemData.itemId,
        itemData
      );
      return result.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
) as any;

export const deleteItem = createAsyncThunk(
  "item/deleteItem",
  async (itemId: number) => {
    try {
      const result = await axios.delete(
        "http://localhost:8000/DeleteItem/" + itemId
      );
      return result.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const itemSlice = createSlice({
  name: "item",
  initialState: {
    isLoading: false,
    isError: false,
    itemData: [] as ItemModel[],
  },
  reducers: {
    nullifyItem: (state) => {
      state.itemData = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchItem.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.itemData = action.payload;
    });

    builder.addCase(createItem.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(createItem.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(createItem.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.itemData = [...state.itemData, action.payload];
    });
  },
});

export const { nullifyItem } = itemSlice.actions;
export default itemSlice.reducer;
