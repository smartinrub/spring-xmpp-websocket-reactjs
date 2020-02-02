export const wsConnect = username => ({ type: 'WS_CONNECT', username });
export const wsConnecting = username => ({ type: 'WS_CONNECTING', username });
export const wsConnected = username => ({ type: 'WS_CONNECTED', username });
export const wsDisconnect = username => ({ type: 'WS_DISCONNECT', username });
export const wsDisconnected = username => ({
  type: 'WS_DISCONNECTED',
  username
});
