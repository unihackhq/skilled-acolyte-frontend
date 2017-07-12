import { put, takeLatest } from 'redux-saga/effects';
import { types as userTypes, actions as userActions } from '../ducks/user';

function* login(action) {
  yield put(userActions.successLogin(action.loginForm)); // TODO: do actual work not pass through
}

function* logout() {
  yield put(userActions.successLogout()); // TODO: also should actually logout the user
}

export default function* rootUser() {
  yield takeLatest(userTypes.LOGIN, login);
  yield takeLatest(userTypes.LOGOUT, logout);
}
