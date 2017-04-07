export const types = {
  LOGIN: 'USER/LOGIN',
  LOGOUT: 'USER/LOGOUT',
  // saga actions
  SUCCESS_LOGIN: 'USER/SUCCESS_LOGIN',
  SUCCESS_LOGOUT: 'USER/SUCCESS_LOGOUT',
}

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SUCCESS_LOGIN:
      return {
        ...action.userData
      }

    case types.SUCCESS_LOGOUT:
      return initialState

    default:
      return state
  }
}

export const actions = {
  login: (loginForm) => ({ type: types.LOGIN, loginForm }),
  logout: () => ({ type: types.LOGOUT }),
  // saga actions
  successLogin: (userData) => ({ type: types.SUCCESS_LOGIN, userData }),
  successLogout: () => ({ type: types.SUCCESS_LOGOUT })
}

export const selectors = {
  details: (state) => state.user,
  loggedIn: (state) => typeof state.user.email !== 'undefined'
}
