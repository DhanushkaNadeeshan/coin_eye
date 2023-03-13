import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  createdAt: "",
  receiverAddress: "",
  senderAddress: "",
  USDValue: "",
  ETHValue: "",
  status: "",
  senderId: "",
  send: false,
};

export const getCryptoSlice = createSlice({
  name: "getcrypto",
  initialState: {
    ...initialState,
  },
  reducers: {
    setGetcrypto: (state, action) => {
      const {
        id,
        createdAt,
        receiverAddress,
        senderAddress,
        USDValue,
        ETHValue,
        status,
        senderId,
        send,
      } = action.payload;

      state.id = id;
      state.createdAt = createdAt;
      state.receiverAddress = receiverAddress;
      state.senderAddress = senderAddress;
      state.USDValue = USDValue;
      state.ETHValue = ETHValue;
      state.status = status;
      state.senderId = senderId;
      state.send = send;
    },
  },
});

export const { setGetcrypto } = getCryptoSlice.actions;

export const selectGetcrypto = (state) => {
  return state.getcrypto;
};

export default getCryptoSlice.reducer;
