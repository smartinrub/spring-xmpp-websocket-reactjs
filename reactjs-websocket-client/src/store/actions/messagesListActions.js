let nextMessageId = 0;

export const messageSent = content => ({
  type: 'MESSAGE_SENT',
  id: nextMessageId++,
  content
});

export const messageReceived = content => ({
  type: 'MESSAGE_RECEIVED',
  id: nextMessageId++,
  content
});
