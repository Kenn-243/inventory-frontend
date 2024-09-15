import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ItemModel } from "../../models/itemModel";
import { UserModel } from "../../models/userModel";

export const fetchItem = createAsyncThunk("item/fetchItem", async () => {
  try {
    const result = await axios.get("http://localhost:8000/GetAllItems");
    if (result != null) {
      const itemDataResult: ItemModel[] = [];
      result.data.map((x: any) => {
        itemDataResult.push({
          itemId: x.itemId,
          itemName: x.itemName,
          user: {
            userId: x.user.userId,
            username: x.user.username,
            email: x.user.email,
          } as UserModel,
        });
      });
      return itemDataResult;
    }
  } catch (err) {
    throw err;
  }
}) as any;

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
      throw err;
    }
  }
);

export const itemSlice = createSlice({
  name: "item",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccessful: false,
    errorMessage: "",
    itemData: [] as ItemModel[],
  },
  reducers: {
    nullifyItem: (state) => {
      state.itemData = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItem.pending, (state) => {
      state.isSuccessful = false;
      state.isLoading = true;
    });
    builder.addCase(fetchItem.rejected, (state) => {
      state.isSuccessful = false;
      state.isLoading = false;
    });
    builder.addCase(fetchItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccessful = true;
      state.itemData = action.payload;
    });

    builder.addCase(createItem.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccessful = false;
      state.errorMessage = "";
    });
    builder.addCase(createItem.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccessful = false;
      state.errorMessage = action.error.message;
    });
    builder.addCase(createItem.fulfilled, (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccessful = true;
      state.errorMessage = "";
    });

    builder.addCase(updateItem.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccessful = false;
      state.errorMessage = "";
    });
    builder.addCase(updateItem.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccessful = false;
      state.errorMessage = action.error.message;
    });
    builder.addCase(updateItem.fulfilled, (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccessful = true;
      state.errorMessage = "";
    });

    builder.addCase(deleteItem.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
      state.isSuccessful = false;
    });
    builder.addCase(deleteItem.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccessful = false;
    });
    builder.addCase(deleteItem.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccessful = true;
    });
  },
});

export const { nullifyItem } = itemSlice.actions;
export default itemSlice.reducer;
