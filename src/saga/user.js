import { put, call, takeLatest } from 'redux-saga/effects';
import * as api from '../api/user';
import { types as userTypes, actions as userActions } from '../ducks/user';

function* login(action) {
  yield call(api.requestEmail, action.email);
  yield put(userActions.successLoginEmail());
}

function* logout() {
  yield put(userActions.successLogout()); // TODO: also should actually logout the user
}

export default function* rootUser() {
  yield takeLatest(userTypes.REQUEST_LOGIN_EMAIL, login);
  yield takeLatest(userTypes.LOGOUT, logout);
}
