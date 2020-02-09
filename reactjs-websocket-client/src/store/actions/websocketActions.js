import * as types from '../../constants/ActionTypes';

export const wsConnect = username => ({ type: types.WS_CONNECT, username });
export const wsDisconnect = username => ({
  type: types.WS_DISCONNECT,
  username
});
