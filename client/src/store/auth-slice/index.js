import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",

  async (formData) => {
    const response = await axios.post(
      "http://localhost:3005/api/auth/register",
      formData,
      {
        withCredentials: true,
      },
    );

    return response.data;
  },
);

export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(
    "http://localhost:3005/api/auth/login",
    formData,
    {
      withCredentials: true,
    },
  );
  return response.data;
});

export const checkAuth = createAsyncThunk("/check-auth", async () => {
  try {
    const response = await axios.get(
      "http://localhost:3005/api/auth/check-auth",
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate , proxy-revalidate",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error in check auth", error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  //the response we get from createAsyncThunk have to be stored in the store that process is done in this extra reducers
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = !action?.payload?.success ? false : true;
        state.user = !action?.payload?.success ? null : action?.payload?.user;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = !action?.payload?.success ? false : true;
        state.user = action?.payload?.success ? action?.payload?.user : null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
