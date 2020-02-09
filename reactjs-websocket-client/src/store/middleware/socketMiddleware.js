import { messageReceived } from '../actions/messagesListActions';
import storage from '../../utils/storage';
import * as types from '../../constants/ActionTypes';

const socketMiddleware = () => {
  let socket = null;

  const onClose = store => () => {};

  const onMessage = store => event => {
    const message = JSON.parse(event.data);
    switch (message.type) {
      case 'AUTHENTICATED':
        console.log('Connected to XMPP server!');
        store.dispatch({ type: 'LoginSuccess' });
        storage.set('user', message.to);
        break;
      case types.CHAT:
        store.dispatch(messageReceived(message.content));
        break;
      case 'GROUP_CHAT':
        // store.dispatch(messageReceived(message.content));
        break;
      case 'ERROR':
        console.log('Login failed!!!');
        store.dispatch({ type: 'LoginFail' });
        break;
      default:
        console.log(message);
        break;
    }
  };

  return store => next => action => {
    switch (action.type) {
      case types.WS_CONNECT:
        if (socket !== null) {
          socket.close();
        }
        socket = new WebSocket('ws://localhost:8080/chat/' + action.username);
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        break;
      case types.WS_DISCONNECT:
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        store.dispatch({ type: 'Logout' });
        storage.forget('user');
        break;
      case types.CHAT:
        socket.send(JSON.stringify(action.message));
        break;
      default:
        return next(action);
    }
  };
};

export default socketMiddleware();
