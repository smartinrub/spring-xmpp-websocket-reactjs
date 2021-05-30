import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  names: [],
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    add: (state, action) => {
      state.names = action.payload;
    },
  },
});

export const { add } = contactsSlice.actions;

export const selectContacts = (state) => state.contacts.names;

export default contactsSlice.reducer;
