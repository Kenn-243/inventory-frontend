import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../../models/userModel";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const result = await axios.get("http://localhost:8000/GetAllUsers");
    const userDataResult: UserModel[] = [];
    result.data.map((x: any) => {
      userDataResult.push({
        userId: x.userId,
        username: x.username,
        email: x.email,
        password: x.password,
      });
    });
    return userDataResult;
  } catch (err) {
    console.log(err);
    throw err;
  }
}) as any;

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData: UserModel) => {
    try {
      const result = await axios.post(
        "http://localhost:8000/CreateUser",
        userData
      );
      return result.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
) as any;

export const signInUser = createAsyncThunk(
  "user/signIn",
  async (userData: UserModel) => {
    try {
      const result = await axios.post(
        "http://localhost:8000/GetUser",
        userData
      );
      return result.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
) as any;

const UserSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    isLoading: false,
    isError: false,
    userData: null as UserModel | null,
  },
  reducers: {
    nullifyUserData: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
    });

    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(createUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(createUser.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isLoggedIn = true;
    });

    builder.addCase(signInUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(signInUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isLoggedIn = true;
      state.userData = action.payload;
    });
  },
});

export const { nullifyUserData } = UserSlice.actions;
export default UserSlice.reducer;
