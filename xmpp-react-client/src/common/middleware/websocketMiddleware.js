import { history } from "../../app/browserhistory";
import { disableAlert, enableAlert } from "../../features/alert/alertSlice";
import { add } from "../../features/contacts/contactsSlice";
import { addMessage } from "../../features/messages/messagesSlice";
import { login, logout } from "../../features/user/userSlice";

const websocketMiddleware = () => {
  let socket = null;

  const onOpen = (store) => (event) => {
    // store.dispatch(actions.wsConnected(event.target.url));
  };

  const onClose = (store) => () => {
    store.dispatch(logout());
    history.push("/login");
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

        store.dispatch(disableAlert());

        history.push("/home");

        const msg = {
          messageType: "GET_CONTACTS",
        };

        socket.send(JSON.stringify(msg));
        break;
      case "NEW_MESSAGE":
        const message = {
          content: payload.content,
          type: payload.messageType,
        };
        store.dispatch(addMessage(message));
        break;
      case "ERROR":
        store.dispatch(logout());
        history.push("/login");
        socket = null;
        break;
      case "LEAVE":
        console.log(payload);
        socket = null;
        break;
      case "FORBIDDEN":
        store.dispatch(
          enableAlert({ message: "Invalid password", enabled: true })
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

  const onError = (store) => (event) => {
    const msg = {
      message:
        "Something went wrong when connecting to the Chat Server. Please contact support if the error persists.",
      enabled: true,
    };
    store.dispatch(enableAlert(msg));
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
        socket.onerror = onError(store);

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
      case 'UNSUBSCRIBE':
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
