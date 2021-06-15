import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enabled: false,
  message: "",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    enableAlert: (state, action) => {
      state.enabled = true;
      state.message = action.payload;
    },
    disableAlert: (state) => {
      state.enabled = false;
      state.message = "";
    },
  },
});

export const { enableAlert, disableAlert } = alertSlice.actions;

export const selectAlert = (state) => state.alert.message;

export default alertSlice.reducer;
