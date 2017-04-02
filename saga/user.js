import { call, put, fork, takeLatest } from 'redux-saga/effects'
import { types as userTypes } from '../ducks/user'

function login(action) {
  // TODO
}

function* watchLogin() {
  yield takeLatest(userTypes.LOGIN, login)
}

export default function* rootUser() {
  yield [
    fork(watchLogin)
  ]
}
