import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  isShow: false,
};
export const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    ...initialState,
  },
  reducers: {
    setLoader: (state, action) => {
      const { message, isShow } = action.payload;
      state.message = message;
      state.isShow = isShow;
    },
  },
});

export const { setLoader } = loaderSlice.actions;

export const selectLoader = (state) => {
  return state.loader;
};

export default loaderSlice.reducer;
