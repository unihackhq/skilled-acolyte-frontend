export const types = {
  REQUEST_LOGIN_EMAIL: 'USER/REQUEST_LOGIN_EMAIL',
  LOGIN: 'USER/LOGIN',
  LOGOUT: 'USER/LOGOUT',
  // saga actions
  SUCCESS_LOGIN_EMAIL: 'USER/SUCCESS_LOGIN_EMAIL',
  SUCCESS_LOGOUT: 'USER/SUCCESS_LOGOUT'
};

const initialState = {
  sent: false,
  user: {},
  token: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_LOGIN_EMAIL:
      return {
        ...state,
        sent: false
      };

    case types.SUCCESS_LOGIN_EMAIL:
      return {
        ...state,
        sent: true
      };

    case types.LOGIN:
      return {
        ...state,
        token: action.token
      };

    case types.SUCCESS_LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export const actions = {
  loginEmail: (email) => ({ type: types.REQUEST_LOGIN_EMAIL, email }),
  login: (token) => ({ type: types.LOGIN, token }),
  logout: () => ({ type: types.LOGOUT }),
  // saga actions
  successLoginEmail: () => ({ type: types.SUCCESS_LOGIN_EMAIL }),
  successLogout: () => ({ type: types.SUCCESS_LOGOUT })
};

export const selectors = {
  emailSent: (state) => state.user.sent,
  loggedIn: (state) => state.user.token !== null,
  details: (state) => state.user.user
};
