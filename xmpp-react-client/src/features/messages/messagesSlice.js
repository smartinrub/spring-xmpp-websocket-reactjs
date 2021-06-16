import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const newMessage = {
        id: state.messages.length,
        content: action.payload.content,
        type: action.payload.type
      }
      state.messages.push(newMessage);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export const selectMessages = (state) => state.messages.messages;

export default messagesSlice.reducer;
