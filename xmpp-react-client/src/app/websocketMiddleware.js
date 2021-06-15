import { history } from "../browserhistory";
import { add } from "../features/contacts/contactsSlice";
import { addMessage } from "../features/messages/messagesSlice";
import {
  disableAlertUser,
  enableAlertUser
} from "../features/user/alertUserSlice";
import { login, logout } from "../features/user/userSlice";

const websocketMiddleware = () => {
  let socket = null;

  const onOpen = (store) => (event) => {
    // store.dispatch(actions.wsConnected(event.target.url));
  };

  const onClose = (store) => () => {
    // store.dispatch(actions.wsDisconnected());
  };

  const onMessage = (store) => (event) => {
    const payload = JSON.parse(event.data);
    switch (payload.messageType) {
      case "JOIN_SUCCESS":
        store.dispatch(
          login({
            username: payload.to,
            loggedIn: true,
          })
        );

        store.dispatch(disableAlertUser());

        history.push("/home");

        const msg = {
          messageType: "GET_CONTACTS",
        };

        socket.send(JSON.stringify(msg));

        console.log("Connected to XMPP server!");
        break;
      case "NEW_MESSAGE":
        const message = {
          content: payload.content,
          type: payload.messageType
        }
        store.dispatch(addMessage(message));
        break;
      case "ERROR":
        console.log("Join failed!!!");
        break;
      case "LEAVE":
        console.log(payload);
        break;
      case "FORBIDDEN":
        store.dispatch(
          enableAlertUser({ message: "Invalid password", enabled: true })
        );
        console.log("Invalid password");
        break;
      case "GET_CONTACTS":
        store.dispatch(add(JSON.parse(payload.content)));
        break;
      default:
        console.log(payload);
        break;
    }
  };

  return (store) => (next) => (action) => {
    switch (action.type) {
      case "WS_CONNECT":
        if (socket !== null) {
          socket.close();
        }

        socket = new WebSocket(
          "ws://localhost:8080/chat/" + action.username + "/" + action.password
        );

        // websocket handlers
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);

        break;
      case "WS_DISCONNECT":
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        store.dispatch(logout());
        history.push("/login");
        break;
      case "NEW_MESSAGE":
        socket.send(JSON.stringify(action.msg));
        break;
      case "ADD_CONTACT":
        socket.send(JSON.stringify(action.msg));

        const msg = {
          messageType: "GET_CONTACTS",
        };

        socket.send(JSON.stringify(msg));
        break;
      default:
        return next(action);
    }
  };
};

export default websocketMiddleware();
