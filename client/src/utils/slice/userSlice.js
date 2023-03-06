import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  picture: "",
  isLogin: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState: {
    ...initialState,
  },
  reducers: {
    setUser: (state, action) => {
      const { id, name, email, picture, loginStatus } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.picture = picture;
      state.isLogin = loginStatus;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state) => {
  return state.user;
};

export default userSlice.reducer;
