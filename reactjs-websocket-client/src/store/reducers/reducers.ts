import { combineReducers } from 'redux';
import { messages } from './messages';
import { loginInfo } from './loginInfo';
import { users } from './users';

const rootReducer = combineReducers({
  messages: messages,
  loginInfo: loginInfo,
  users: users
});

export default rootReducer;
