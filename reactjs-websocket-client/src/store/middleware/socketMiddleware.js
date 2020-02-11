import { messageReceived } from '../actions/messagesListActions';
import storage from '../../utils/storage';
import env from '../../env';
import { WS_CONNECT, WS_DISCONNECT } from '../actions/websocketActions';
import { CHAT, GROUP_CHAT } from '../actions/chatActions';
import { fetchUsers } from '../actions';

export const AUTHENTICATED = 'AUTHENTICATED';
export const ERROR = 'ERROR';

const socketMiddleware = () => {
  let socket = null;

  const onClose = store => () => {};

  const onMessage = store => event => {
    const message = JSON.parse(event.data);
    switch (message.type) {
      case AUTHENTICATED:
        console.log('Connected to XMPP server!');
        store.dispatch({ type: 'LoginSuccess' });
        store.dispatch(fetchUsers(message.to));
        storage.set('user', message.to);
        break;
      case CHAT:
        store.dispatch(messageReceived(message.content));
        break;
      case GROUP_CHAT:
        // store.dispatch(messageReceived(message.content));
        break;
      case ERROR:
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
      case WS_CONNECT:
        if (socket !== null) {
          socket.close();
        }
        socket = new WebSocket(
          'ws://' + env.hostname + '/chat/' + action.username
        );
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        break;
      case WS_DISCONNECT:
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        store.dispatch({ type: 'Logout' });
        storage.forget('user');
        break;
      case CHAT:
        socket.send(JSON.stringify(action.message));
        break;
      default:
        return next(action);
    }
  };
};

export default socketMiddleware();
