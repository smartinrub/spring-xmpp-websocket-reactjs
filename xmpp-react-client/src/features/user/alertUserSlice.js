import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enabled: false,
  message: "",
};

export const alertUserSlice = createSlice({
  name: "alertUser",
  initialState,
  reducers: {
    enableAlertUser: (state, action) => {
      state.enabled = true;
      state.message = action.payload;
    },
    disableAlertUser: (state) => {
      state.enabled = false;
      state.message = "";
    },
  },
});

export const { enableAlertUser, disableAlertUser } = alertUserSlice.actions;

export const selectAlertUser = (state) => state.alertUser.message;

export default alertUserSlice.reducer;
