import { fork } from 'redux-saga/effects'
import rootUser from './user'
import rootTeam from './team'

export function* rootSaga() {
  yield [
    fork(rootUser),
    fork(rootTeam)
  ]
}
