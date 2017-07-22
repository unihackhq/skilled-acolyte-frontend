import { put, call, takeLatest } from 'redux-saga/effects';
import * as api from '../api/team';
import { types as teamTypes, actions as teamActions } from '../ducks/team';

function* fetchTeam(action) {
  try {
    const team = yield call(api.getUserTeam, action.userId);
    yield put(teamActions.successFetch(team));
  } catch (error) {
    yield put(teamActions.failureFetch(error.message));
  }
}

export default function* rootTeam() {
  yield takeLatest(teamTypes.REQUEST_FETCH, fetchTeam);
}
