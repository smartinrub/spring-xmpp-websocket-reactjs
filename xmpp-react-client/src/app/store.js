import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "../features/contacts/contactsSlice";
import currentReducer from "../features/current/currentSlice";
import alertUserReducer from "../features/user/alertUserSlice";
import userReducer from "../features/user/userSlice";
import websocketMiddleware from "./websocketMiddleware";

export const store = configureStore({
  reducer: {
    user: userReducer,
    alertUser: alertUserReducer,
    contacts: contactsReducer,
    current: currentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware),
});
