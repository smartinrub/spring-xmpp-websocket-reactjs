export const WS_CONNECT = 'WS_CONNECT';
export const WS_DISCONNECT = 'WS_DISCONNECT';

export const wsConnect = username => ({ type: WS_CONNECT, username });

export const wsDisconnect = username => ({
  type: WS_DISCONNECT,
  username
});
