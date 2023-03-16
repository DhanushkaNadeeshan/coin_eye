import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  message: "",
  isShow: false,
};
export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    ...initialState,
  },
  reducers: {
    setAlert: (state, action) => {
      const { type, message, isShow } = action.payload;
      state.type = type;
      state.message = message;
      state.isShow = isShow;
    },
  },
});

export const { setAlert } = alertSlice.actions;

export const selectAlert = (state) => {
  return state.alert;
};

export default alertSlice.reducer;
