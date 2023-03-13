import { createSlice } from "@reduxjs/toolkit";

export const requestCryptoSlice = createSlice({
  name: "requestcrypto",
  initialState: {
    list: [],
  },
  reducers: {
    setRequestCrypto: (state, action) => {
      state.list = [...action.payload];
    },
    removeRequestCrypto: (state, action) => {
      let tempList = [...state.list];

      tempList = tempList.filter((data) => data._id !== action.payload.id);
      state.list = tempList;
    },
  },
});

export const { setRequestCrypto, removeRequestCrypto } =
  requestCryptoSlice.actions;

export const selectRequestCrypto = (state) => {
  return state.requestcrypto;
};

export default requestCryptoSlice.reducer;
