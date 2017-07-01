import { put, fork, takeLatest } from 'redux-saga/effects';
import { types as userTypes, actions as userActions } from '../ducks/user';

function* login(action) {
  yield put(userActions.successLogin(action.loginForm)); // TODO: do actual work not pass through
}

function* logout() {
  yield put(userActions.successLogout()); // TODO: also should actually logout the user
}

function* watchLogin() {
  yield takeLatest(userTypes.LOGIN, login);
}

function* watchLogout() {
  yield takeLatest(userTypes.LOGOUT, logout);
}

export default function* rootUser() {
  yield [
    fork(watchLogin),
    fork(watchLogout)
  ];
}
