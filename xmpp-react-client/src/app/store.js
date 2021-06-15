import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "../features/contacts/contactsSlice";
import currentReducer from "../features/current/currentSlice";
import messagesReducer from "../features/messages/messagesSlice";
import alertUserReducer from "../features/user/alertUserSlice";
import userReducer from "../features/user/userSlice";
import websocketMiddleware from "./websocketMiddleware";

export const store = configureStore({
  reducer: {
    user: userReducer,
    alertUser: alertUserReducer,
    contacts: contactsReducer,
    current: currentReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware),
});
