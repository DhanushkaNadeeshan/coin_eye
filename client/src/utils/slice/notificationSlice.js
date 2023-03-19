import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  notify: false,
};
export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    ...initialState,
  },
  reducers: {
    setNotificationList: (state, action) => {
      const list = action.payload;
      state.list = list;
      const unreadList = list.filter((data) => data.read === false);
      if (unreadList.length > 0) {
        state.notify = true;
      } else {
        state.notify = false;
      }
    },
    markAsRead: (state, action) => {
      const id = action.payload;
      const list = [...state.list];
      const index = list.findIndex((info) => info._id === id);

      if (index > -1) {
        list[index].read = true;
      }

      state.list = list;
      
      // check still uread list area thera
      const unreadList = list.filter((data) => data.read === false);
      if (unreadList.length > 0) {
        state.notify = true;
      } else {
        state.notify = false;
      }
    },
  },
});

export const { setNotificationList, markAsRead } = notificationSlice.actions;

export const selectNotificationList = (state) => {
  return state.notification;
};

export default notificationSlice.reducer;
