import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice/index";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
