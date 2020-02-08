const loginInfoInitialState = {
  isAuthenticated: false
};

export const loginInfo = (
  state = { ...loginInfoInitialState },
  action: any
) => {
  switch (action.type) {
    case 'LoginSuccess': {
      return {
        ...state,
        isAuthenticated: true
      };
    }
    case 'LoginFail': {
      return {
        ...state,
        authenticated: false
      };
    }
    default:
      return state;
  }
};
