import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import alertUserReducer from "../features/user/alertUserSlice";
import websocketMiddleware from "./websocketMiddleware";
import contactsReducer from "../features/contacts/contactsSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    alertUser: alertUserReducer,
    contacts: contactsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware),
});
