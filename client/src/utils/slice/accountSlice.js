import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walletAddress: "",
  savingAccountETH: 0,
  savingAccountUSD: 0,
  transactionAccountETH: 0,
  transactionAccountUSD: 0,
  cards: [],
};

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    ...initialState,
  },
  reducers: {
    setWalletDetails: (state, action) => {
      const payload = action.payload;
      state.walletAddress = payload.wallet_address;
      state.savingAccountETH = payload.s_account_ETH;
      state.savingAccountUSD = payload.s_account_USD;
      state.transactionAccountETH = payload.t_account_ETH;
      state.transactionAccountUSD = payload.t_account_USD;
      state.cards = payload.cards;
    },
  },
});

export const { setWalletDetails } = accountSlice.actions;

export const selectWalletAddress = (state) => {
  return state.account.walletAddress;
};

export const selectCards = (state) => {
  return state.account.cards;
};

export const selectETHBalance = (state) => {
  const { savingAccountETH, transactionAccountETH } = state.account;
  return { savingAccountETH, transactionAccountETH };
};

export const selectUSDBalance = (state) => {
  const { savingAccountUSD, transactionAccountUSD } = state.account;
  return { savingAccountUSD, transactionAccountUSD };
};

export default accountSlice.reducer;
