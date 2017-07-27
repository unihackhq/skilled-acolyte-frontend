import { put, call, select, takeLatest } from 'redux-saga/effects';
import * as api from '../api/invite';
import { types as inviteTypes, actions as inviteActions } from '../ducks/invite';
import { selectors as userSelectors } from '../ducks/user';
import { actions as teamActions } from '../ducks/team';

function* fetchInvites(action) {
  const user = yield select(userSelectors.user);
  try {
    const team = yield call(api.getInvites, user.id); // send user's id
    yield put(inviteActions.successFetch(team));
  } catch (error) {
    yield put(inviteActions.failureFetch(error.message));
  }
}

function* accept(action) {
  try {
    yield call(api.acceptInvite, action.id); // send invite's id
    yield put(inviteActions.successAccept(action.id));
  } catch (error) {
    yield put(inviteActions.failureAccept(error.message));
  }
  yield put(inviteActions.fetch()); // get updated invites
  yield put(teamActions.fetch()); // get new team (just joined)
}

function* ignore(action) {
  try {
    yield call(api.ignoreInvite, action.id); // send invite's id
    yield put(inviteActions.successIgnore(action.id));
  } catch (error) {
    yield put(inviteActions.failureIgnore(error.message));
  }
  yield put(inviteActions.fetch()); // get updated invites
}

export default function* rootInvite() {
  yield takeLatest(inviteTypes.REQUEST_FETCH, fetchInvites);
  yield takeLatest(inviteTypes.REQUEST_ACCEPT, accept);
  yield takeLatest(inviteTypes.REQUEST_IGNORE, ignore);
}
