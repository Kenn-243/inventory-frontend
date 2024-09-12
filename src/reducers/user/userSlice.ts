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
  } catch (err: any) {
    console.log(err);
    throw err.response.data;
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
    } catch (err: any) {
      console.log(err);
      throw err.response.data;
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
      console.log(result.data);
      return result.data;
    } catch (err: any) {
      throw err.response.data;
    }
  }
) as any;

const UserSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedOut: false,
    isLoggedIn: false,
    isLoading: false,
    isError: false,
    errorMessage: "",
    isSuccessful: false,
    userData: null as UserModel | null,
  },
  reducers: {
    nullifyUserData: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
    },
    successLogOut: (state) => {
      state.isLoggedOut = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
      state.errorMessage = "";
    });

    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccessful = false;
      state.errorMessage = "";
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccessful = false;
      state.errorMessage = action.error.message;
    });
    builder.addCase(createUser.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccessful = true;
      state.isLoggedIn = true;
      state.errorMessage = "";
    });

    builder.addCase(signInUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccessful = false;
      state.errorMessage = "";
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccessful = false;
      state.errorMessage = action.error.message;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isLoggedIn = true;
      state.isLoggedOut = false;
      state.userData = action.payload;
      state.isSuccessful = true;
      state.errorMessage = "";
    });
  },
});

export const { nullifyUserData, successLogOut } = UserSlice.actions;
export default UserSlice.reducer;
