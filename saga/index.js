import { fork } from 'redux-saga/effects'
import rootUser from './user'

export function* rootSaga() {
  yield [
    fork(rootUser),
  ]
}
