import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

export const currentSlice = createSlice({
  name: "current",
  initialState,
  reducers: {
    select: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { select } = currentSlice.actions;

export const selectCurrent = (state) => state.current.name;

export default currentSlice.reducer;
