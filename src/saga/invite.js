import { put, call, select, takeLatest } from 'redux-saga/effects';
import * as api from '../api/invite';
import { types as inviteTypes, actions as inviteActions } from '../ducks/invite';
import { selectors as userSelectors } from '../ducks/user';

function* fetchInvites(action) {
  const userDetails = yield select(userSelectors.details);
  try {
    const team = yield call(api.getInvites, userDetails.id); // send user's id
    yield put(inviteActions.successFetch(team));
  } catch (error) {
    yield put(inviteActions.failureFetch(error.message));
  }
}

export default function* rootInvite() {
  yield takeLatest(inviteTypes.REQUEST_FETCH, fetchInvites);
}
