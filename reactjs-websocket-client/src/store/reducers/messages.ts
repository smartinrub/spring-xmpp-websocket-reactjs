import { ADD_MESSAGE, MESSAGE_RECEIVED } from '../actions/messagesListActions';

export const messages = (state: Array<any> = [], action: any) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return state.concat([
        {
          content: action.content,
          id: action.id,
          type: action.type
        }
      ]);
    case MESSAGE_RECEIVED:
      return state.concat([
        {
          content: action.content,
          id: action.id,
          type: action.type
        }
      ]);
    default:
      return state;
  }
};
