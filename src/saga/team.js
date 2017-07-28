import { put, call, select, takeLatest } from 'redux-saga/effects';
import * as api from '../api/team';
import { types as teamTypes, actions as teamActions, selectors as teamSelectors } from '../ducks/team';
import { selectors as userSelectors } from '../ducks/user';

function* fetchTeam(action) {
  const userDetails = yield select(userSelectors.user);
  try {
    const team = yield call(api.getStudentsTeam, userDetails.id); // send user's id
    yield put(teamActions.successFetch(team));
  } catch (error) {
    yield put(teamActions.failureFetch(error.message));
  }
}

function* inviteStudent(action) {
  const team = yield select(teamSelectors.team);
  try {
    yield call(api.inviteStudentToTeam, team.id, action.studentId); // send team id and id of the student we want to invite
    yield put(teamActions.successInviteStudent());
  } catch (error) {
    yield put(teamActions.failureInviteStudent(error.message));
  }
  yield put(teamActions.fetch());
}

function* create(action) {
  const user = yield select(userSelectors.user);
  try {
    yield call(api.createTeam, user.id, action.teamName); // send user id and team name
    yield put(teamActions.successCreate());
  } catch (error) {
    yield put(teamActions.failureCreate(error.message));
  }
  yield put(teamActions.fetch());
}

function* leave(action) {
  const user = yield select(userSelectors.user);
  const team = yield select(teamSelectors.team);
  try {
    yield call(api.leaveTeam, user.id, team.id); // send user id and team id
    yield put(teamActions.successLeave());
  } catch (error) {
    yield put(teamActions.failureLeave(error.message));
  }
  yield put(teamActions.fetch());
}

export default function* rootTeam() {
  yield takeLatest(teamTypes.REQUEST_FETCH, fetchTeam);
  yield takeLatest(teamTypes.REQUEST_INVITE_STUDENT, inviteStudent);
  yield takeLatest(teamTypes.REQUEST_CREATE, create);
  yield takeLatest(teamTypes.REQUEST_LEAVE, leave);
}
