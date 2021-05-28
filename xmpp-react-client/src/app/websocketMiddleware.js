const websocketMiddleware = () => {
  let socket = null;

  const onOpen = (store) => (event) => {
    console.log("hello");
  };

  const onClose = (store) => () => {};

  const onMessage = (store) => (event) => {};

  return (store) => (next) => (action) => {
    console.log("hello");
  };
};

export default websocketMiddleware;
