import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "../features/contacts/contactsSlice";
import currentReducer from "../features/current/currentSlice";
import messagesReducer from "../features/messages/messagesSlice";
import alertReducer from "../features/alert/alertSlice";
import userReducer from "../features/user/userSlice";
import websocketMiddleware from "../common/middleware/websocketMiddleware";

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    contacts: contactsReducer,
    current: currentReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware),
});
