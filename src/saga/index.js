import { fork } from 'redux-saga/effects';
import rootUser from './user';
import rootTeam from './team';
import rootInvite from './invite';

export function* rootSaga() {
  yield [
    fork(rootUser),
    fork(rootTeam),
    fork(rootInvite)
  ];
}
