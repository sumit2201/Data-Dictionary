import {actionTypes} from '../actions/actionTypes'
import jwt from 'jsonwebtoken';

const validCredentials = () => {
    const authorizationToken = localStorage.getItem('jwtToken');
    if (authorizationToken === null)
        return false;
    try {
        jwt.decode(authorizationToken);
        return true;
    } catch(err) {
        return false;
    }
}

const initialState = {
    isAuthenticated: validCredentials(),
    authenticatedUsername: validCredentials() === false ? '' : jwt.decode(localStorage.getItem('jwtToken')).username,
    authorizedRole: validCredentials() === false ? '' : jwt.decode(localStorage.getItem('jwtToken')).role
};

const reducer = (state = initialState, action) => {
    const response = action.payload;
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESSFUL:
            return {
                isAuthenticated: true,
                authenticatedUsername: response.authenticatedUsername,
                authorizedRole:response.authorizedRole
            }
        case actionTypes.LOGOUT_SUCCESSFUL: {
            return {
                isAuthenticated: false,
                authenticatedUsername: '',
                authorizedRole:"",
            }
        }
        case actionTypes.LOGIN_ERROR: {
            return {
                errors:{
                    invalidCredentials: response
                },
            }
        }
        default:
            return state;
    }
};

export default reducer;
