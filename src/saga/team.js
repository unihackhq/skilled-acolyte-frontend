import { put, fork, takeLatest } from 'redux-saga/effects';
import { types as teamTypes, actions as teamActions } from '../ducks/team';

function* fetchTeams() {
  yield put(teamActions.successFetchTeams(['Team 1', 'Team 2'])); // TODO: do actual work not pass through
}

function* watchFetchTeams() {
  yield takeLatest(teamTypes.FETCHTEAMS, fetchTeams);
}

export default function* rootTeam() {
  yield [
    fork(watchFetchTeams),
  ];
}
