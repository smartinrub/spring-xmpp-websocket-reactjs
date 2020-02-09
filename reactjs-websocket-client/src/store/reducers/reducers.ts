import { combineReducers } from 'redux';
import messages from './messagesList';
import { loginInfo } from './loginInfo';

const rootReducer = combineReducers({
  messages: messages,
  loginInfo: loginInfo
});

export default rootReducer;
