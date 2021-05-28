const websocketMiddleware = () => {
  let socket = null;

  const onOpen = (store) => (event) => {
    console.log("hello");
  };

  const onClose = (store) => () => {};

  const onMessage = (store) => (event) => {};

  return (store) => (next) => (action) => {
    switch (action.type) {
      case "WS_CONNECT":
        break;
      case "WS_DISCONNECT":
        break;
      case "NEW_MESSAGE":
        break;
      default:
        return next(action);
    }
  };
};

export default websocketMiddleware();
