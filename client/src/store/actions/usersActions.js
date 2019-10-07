import {actionTypes} from './actionTypes'

export const userLoginRequest = (loginPayload)=> {
    return {
        type: actionTypes.LOGIN_REQUEST,
        payload: loginPayload
    }
}

export const handleLoginError = (errMsg) => {
    return {
        type: actionTypes.LOGIN_ERROR,
        payload: errMsg
    }
}

export const userLogoutRequest = () => {
    return {
        type: actionTypes.LOGOUT_USER,
        payload: "",
    }
}