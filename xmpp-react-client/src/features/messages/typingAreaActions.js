export const messageSent = (content) => ({ type: "MESSAGE_SENT", content });
export const newMessage = (msg) => ({ type: "NEW_MESSAGE", msg });
export const unsubscribe = msg => ({ type: 'UNSUBSCRIBE', msg });