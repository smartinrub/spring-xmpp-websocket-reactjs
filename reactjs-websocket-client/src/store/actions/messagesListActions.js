import * as types from '../../constants/ActionTypes';

let nextMessageId = 0;

export const addMessage = content => ({
  type: types.ADD_MESSAGE,
  id: nextMessageId++,
  content
});

export const messageReceived = content => ({
  type: types.MESSAGE_RECEIVED,
  id: nextMessageId++,
  content
});
