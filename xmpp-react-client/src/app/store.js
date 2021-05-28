import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import alertUserReducer from "../features/user/alertUserSlice";
import websocketMiddleware from "./websocketMiddleware";

export const store = configureStore({
  reducer: {
    user: userReducer,
    alertUser: alertUserReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware),
});
