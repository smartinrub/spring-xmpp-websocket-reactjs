import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR
} from '../actions/chatListActions';
import { User } from '../../types';

const initialState = {
  users: [] as User[]
};

export const users = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.users
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
