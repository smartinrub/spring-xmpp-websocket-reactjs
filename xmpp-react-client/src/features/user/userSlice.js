import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.username = null;
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUsername = (state) => state.user.username;

export const selectLoggedIn = (state) => state.user.loggedIn;

export default userSlice.reducer;
