import { createStore, applyMiddleware, combineReducers } from 'redux'
import reducers from './ducks/reducers'

// window in server is gonna throw
let reduxExtensionSupport
if (typeof window !== 'undefined') {
  reduxExtensionSupport = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
}

export const initStore = (initialState) => {
  return createStore(
    combineReducers({
      ...reducers,
    }),
    reduxExtensionSupport // add support for redux devtool extenstion
                          // TODO: remove in proudction
  )
}
