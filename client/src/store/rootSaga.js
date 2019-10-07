import { all, call } from 'redux-saga/effects';
import { watchLoginUser } from './sagas/userSaga';
import { watchVariableActions } from './sagas/variableSaga';
 
export default function* rootSaga() {
    yield all([
        call(watchLoginUser),
        call(watchVariableActions)
    ]);
}