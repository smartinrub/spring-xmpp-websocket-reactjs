import { combineReducers } from 'redux';
import { websocketReducer } from './websocket';
import messages from './messagesList';
import { loginInfo } from './loginInfo';

const rootReducer = combineReducers({
  websocket: websocketReducer,
  messages: messages,
  loginInfo: loginInfo
});

export default rootReducer;
