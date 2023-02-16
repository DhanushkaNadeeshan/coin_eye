import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import accountReducer from "./slice/accountSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    account: accountReducer,
  },
});
