import * as types from '../../constants/ActionTypes';

const messages = (state = [], action) => {
  switch (action.type) {
    case types.ADD_MESSAGE:
      return state.concat([
        {
          content: action.content,
          id: action.id,
          type: action.type
        }
      ]);
    case types.MESSAGE_RECEIVED:
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

export default messages;
