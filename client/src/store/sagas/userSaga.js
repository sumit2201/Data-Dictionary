import { call, put, takeLatest } from 'redux-saga/effects';
import { loginUser } from '../../APIs/user-apis';
import { handleLoginError } from '../actions/usersActions';
import { actionTypes } from '../actions/actionTypes';

 
export function* watchLoginUser() {
    yield takeLatest(actionTypes.LOGIN_REQUEST,callLoginUser);
    yield takeLatest(actionTypes.LOGOUT_USER,callLogoutUser);
}
 
function* callLoginUser(action) {
    try {
        const userLoginDetails = action.payload;
        const response = yield call(loginUser, userLoginDetails);
        if(response){
            yield put({ type: actionTypes.LOGIN_SUCCESSFUL, payload: response })
        }else{
            const msg = "Invalid username and password";
            yield put(handleLoginError(msg));
        }
    } catch(error) {
        const msg = "Login request failed due to error "+ error;
        yield put(handleLoginError(msg));
    }
}

function* callLogoutUser(action){
    localStorage.removeItem('jwtToken');
    yield put({ type: actionTypes.LOGOUT_SUCCESSFUL, payload: "" })
}