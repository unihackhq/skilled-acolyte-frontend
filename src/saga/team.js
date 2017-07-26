import { put, call, select, takeLatest } from 'redux-saga/effects';
import * as api from '../api/team';
import { types as teamTypes, actions as teamActions } from '../ducks/team';
import { selectors as userSelectors } from '../ducks/user';

function* fetchTeam(action) {
  try {
    const userDetails = yield select(userSelectors.details);
    const team = yield call(api.getStudentsTeam, userDetails.id);
    yield put(teamActions.successFetch(team));
  } catch (error) {
    yield put(teamActions.failureFetch(error.message));
  }
}

function* inviteStudent(action) {
  try {
    yield call(api.inviteStudentToTeam, action.studentId);
    yield put(teamActions.successInviteStudent());
  } catch (error) {
    yield put(teamActions.failureInviteStudent(error.message));
  }
  yield put(teamActions.fetch(action.studentId));
}

export default function* rootTeam() {
  yield takeLatest(teamTypes.REQUEST_FETCH, fetchTeam);
  yield takeLatest(teamTypes.REQUEST_INVITE_STUDENT, inviteStudent);
}
