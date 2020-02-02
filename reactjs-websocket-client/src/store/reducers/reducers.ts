import { combineReducers } from 'redux';
import { websocketReducer } from './websocket';
import messages from './messagesList';

const rootReducer = combineReducers({
  websocket: websocketReducer,
  messages: messages
});

export default rootReducer;
