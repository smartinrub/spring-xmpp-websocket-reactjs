const loginInfoInitialState = {
  isAuthenticated: false,
  noUser: false
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
        noUser: true
      };
    }
    default:
      return state;
  }
};
