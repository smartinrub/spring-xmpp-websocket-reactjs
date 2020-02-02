const websocketInitialState = {};

export const websocketReducer = (
  state = { ...websocketInitialState },
  action: any
) => {
  switch (action.type) {
    case 'WS_CONNECT':
      return { ...state, username: action.username };
    default:
      return state;
  }
};
