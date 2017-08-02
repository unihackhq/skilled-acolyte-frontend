import { put, call, takeLatest } from 'redux-saga/effects';
import * as api from '../api/user';
import { types as userTypes, actions as userActions } from '../ducks/user';

function* requestEmail(action) {
  try {
    yield call(api.requestEmail, action.email);
    yield put(userActions.successLoginEmail());
  } catch (error) {
    yield put(userActions.failureLoginEmail(error.message));
  }
}

function* login(action) {
  try {
    const user = yield call(api.login, action.token);
    yield put(userActions.successLogin(user));
  } catch (error) {
    yield put(userActions.failureLogin(error.message));
  }
}

function* logout() {
  yield put(userActions.successLogout()); // TODO: also should actually logout the user
}

export default function* rootUser() {
  yield takeLatest(userTypes.REQUEST_LOGIN_EMAIL, requestEmail);
  yield takeLatest(userTypes.REQUEST_LOGIN, login);
  yield takeLatest(userTypes.REQUEST_LOGOUT, logout);
}
