import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walletAddress: "",
  totalUSD: 0,
  totalETH: 0,
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
      state.totalUSD = payload.totalUSD;
      state.totalETH = payload.totalETH;
      state.savingAccountETH = payload.s_accountETH;
      state.savingAccountUSD = payload.s_account_USD;
      state.transactionAccountETH = payload.t_accountETH;
      state.transactionAccountUSD = payload.t_account_USD;
      state.cards = payload.cards;
    },
    updateETH: (state, action) => {
      const { totalETH, savingAccountETH, transactionAccountETH } =
        action.payload;
      state.totalETH = totalETH;
      state.savingAccountETH = savingAccountETH;
      state.transactionAccountETH = transactionAccountETH;
    },
    updateCard: (state, action) => {
      state.cards = action.payload;
    },
  },
});

export const { setWalletDetails, updateETH, updateCard } = accountSlice.actions;

export const selectWalletAddress = (state) => {
  return state.account.walletAddress;
};

export const selectCards = (state) => {
  return state.account.cards;
};

export const selectETHBalance = (state) => {
  const { savingAccountETH, transactionAccountETH, totalETH } = state.account;
  return { savingAccountETH, transactionAccountETH, totalETH };
};

export const selectUSDBalance = (state) => {
  const { savingAccountUSD, transactionAccountUSD, totalUSD } = state.account;
  return { savingAccountUSD, transactionAccountUSD, totalUSD };
};

export default accountSlice.reducer;
