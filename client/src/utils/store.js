import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import accountReducer from "./slice/accountSlice";
import getCryptoReducer from "./slice/getCryptoSlice";
import requestCryptoReducer from "./slice/requestCryptoSlice";
import alertReducer from "./slice/alertSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    account: accountReducer,
    getcrypto: getCryptoReducer,
    requestcrypto: requestCryptoReducer,
    alert: alertReducer,
  },
});
