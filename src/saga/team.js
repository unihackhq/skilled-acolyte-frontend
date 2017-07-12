import { put, takeLatest } from 'redux-saga/effects';
import { types as teamTypes, actions as teamActions } from '../ducks/team';

function* fetchTeams() {
  yield put(teamActions.successFetchTeams(['Team 1', 'Team 2'])); // TODO: do actual work not pass through
}

export default function* rootTeam() {
  yield takeLatest(teamTypes.FETCHTEAMS, fetchTeams);
}
