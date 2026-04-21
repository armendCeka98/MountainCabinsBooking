import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./toastSlice";
import authReducer from "./authSlice";
import loadingReducer from "./loadingSlice";

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    auth: authReducer,
    loading: loadingReducer,
  },
});