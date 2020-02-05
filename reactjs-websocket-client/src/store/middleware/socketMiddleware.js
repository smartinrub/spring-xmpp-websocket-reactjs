import SockJS from 'sockjs-client';

import * as actions from '../actions/websocketActions';
import { messageReceived } from '../actions/messagesListActions';

const socketMiddleware = () => {
  let socket = null;

  const onOpen = store => event => {
    // store.dispatch(actions.wsConnected(event.target.url));
  };

  const onClose = store => () => {
    store.dispatch(actions.wsDisconnected());
  };

  const onMessage = store => event => {
    const payload = JSON.parse(event.data);
    switch (payload.messageType) {
      case 'JOIN_SUCCESS':
        console.log('Connected to XMPP server!');
        break;
      case 'NEW_MESSAGE':
        store.dispatch(messageReceived(payload.content));
        break;
      case 'ERROR':
        console.log('Join failed!!!');
        break;
      case 'LEAVE':
        console.log(payload);
        break;
      default:
        console.log(payload);
        break;
    }
  };

  return store => next => action => {
    switch (action.type) {
      case 'WS_CONNECT':
        if (socket !== null) {
          socket.close();
        }

        // https://www.npmjs.com/package/sockjs-client
        socket = new SockJS('http://localhost:8080/chat');

        // websocket handlers
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);

        break;
      case 'WS_DISCONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;
      case 'NEW_MESSAGE':
        socket.send(JSON.stringify(action.msg));
        break;
      default:
        return next(action);
    }
  };
};

export default socketMiddleware();
