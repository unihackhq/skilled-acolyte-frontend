export const types = {
  LOGIN: 'USER/LOGIN',
  LOGOUT: 'USER/LOGOUT'
}

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      console.log(action.data)
      return {
        ...action.data
      }

    case types.LOGOUT:
      return initialState

    default:
      return state
  }
}

export const actions = {
  login: (userData) => ({ type: types.LOGIN, data: userData }),
  logout: () => ({ type: types.LOGOUT })
}

export const selectors = {
  details: (state) => state.user,
  loggedIn: (state) => typeof state.user.email != 'undefined'
}
