import { put, call, takeLatest } from 'redux-saga/effects';
import * as api from '../api/team';
import { types as teamTypes, actions as teamActions } from '../ducks/team';

function* fetchTeam(action) {
  try {
    const team = yield call(api.getStudentsTeam, action.userId);
    yield put(teamActions.successFetch(team));
  } catch (error) {
    yield put(teamActions.failureFetch(error.message));
  }
}

function* inviteStudent(action) {
  try {
    yield call(api.inviteStudentToTeam, action.userId);
    yield put(teamActions.successInviteStudent());
  } catch (error) {
    yield put(teamActions.failureInviteStudent(error.message));
  }
  yield put(teamActions.fetch(action.userId));
}

export default function* rootTeam() {
  yield takeLatest(teamTypes.REQUEST_FETCH, fetchTeam);
  yield takeLatest(teamTypes.REQUEST_INVITE_STUDENT, inviteStudent);
}
