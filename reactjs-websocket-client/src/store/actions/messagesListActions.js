let nextMessageId = 0;

export const addMessage = content => ({
  type: 'ADD_MESSAGE',
  id: nextMessageId++,
  content
});

export const messageReceived = content => ({
  type: 'MESSAGE_RECEIVED',
  id: nextMessageId++,
  content
});
