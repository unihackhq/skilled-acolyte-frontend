export const types = {
  REQUEST_LOGIN_EMAIL: 'USER/REQUEST_LOGIN_EMAIL',
  REQUEST_LOGIN: 'USER/REQUEST_LOGIN',
  REQUEST_LOGOUT: 'USER/REQUEST_LOGOUT',
  // saga actions
  SUCCESS_LOGIN_EMAIL: 'USER/SUCCESS_LOGIN_EMAIL',
  FAILURE_LOGIN_EMAIL: 'USER/FAILURE_LOGIN_EMAIL',
  SUCCESS_LOGIN: 'USER/SUCCESS_LOGIN',
  FAILURE_LOGIN: 'USER/FAILURE_LOGIN',
  SUCCESS_LOGOUT: 'USER/SUCCESS_LOGOUT',
  FAILURE_LOGOUT: 'USER/FAILURE_LOGOUT'
};

const initialState = {
  loading: false,
  sent: false,
  user: {},
  token: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_LOGIN_EMAIL:
      return {
        ...state,
        loading: true,
        sent: false
      };

    case types.REQUEST_LOGIN:
      return {
        ...state,
        loading: true,
        token: action.token
      };

    case types.REQUEST_LOGOUT:
      return {
        ...state,
        loading: true
      };

    case types.SUCCESS_LOGIN_EMAIL:
      return {
        ...state,
        loading: false,
        sent: true
      };

    case types.SUCCESS_LOGIN:
      return {
        ...state,
        loading: false,
        user: action.user
      };

    case types.SUCCESS_LOGOUT:
      return initialState;

    case types.FAILURE_LOGIN_EMAIL:
    case types.FAILURE_LOGIN:
    case types.FAILURE_LOGOUT:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export const actions = {
  loginEmail: (email) => ({ type: types.REQUEST_LOGIN_EMAIL, email }),
  login: (token) => ({ type: types.REQUEST_LOGIN, token }),
  logout: () => ({ type: types.REQUEST_LOGOUT }),
  // saga actions
  successLoginEmail: () => ({ type: types.SUCCESS_LOGIN_EMAIL }),
  failureLoginEmail: (error) => ({ type: types.FAILURE_LOGIN_EMAIL }),
  successLogin: (user) => ({ type: types.SUCCESS_LOGIN, user }),
  failureLogin: (error) => ({ type: types.FAILURE_LOGIN, error }),
  successLogout: () => ({ type: types.SUCCESS_LOGOUT }),
  failureLogout: (error) => ({ type: types.FAILURE_LOGOUT })
};

export const selectors = {
  isEmailSent: (state) => state.user.sent,
  isLoading: (state) => state.user.loading,
  isLoggedIn: (state) => state.user.token !== null,
  user: (state) => state.user.user
};
