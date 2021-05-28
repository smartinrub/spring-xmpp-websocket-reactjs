import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import websocketMiddleware from "./websocketMiddleware";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: {
    websocket: websocketMiddleware
  }
});
