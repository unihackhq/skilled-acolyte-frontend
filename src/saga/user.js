import { call, put, fork, takeLatest } from 'redux-saga/effects'
import { types as userTypes, actions as userActions } from '../ducks/user'

function* login(action) {
  yield put(userActions.successLogin(action.loginForm)) // TODO: do actual work not pass through
}

function* watchLogin() {
  yield takeLatest(userTypes.LOGIN, login)
}

export default function* rootUser() {
  yield [
    fork(watchLogin)
  ]
}
