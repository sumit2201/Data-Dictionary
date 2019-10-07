import Axios from 'axios';
import { API_END_POINT } from '../config';
import jwt from 'jsonwebtoken';

const prepareURL = apiUrl => API_END_POINT + apiUrl;

export const loginUser = (userLoginDetails) => {
    try {
        return Axios.post(prepareURL('/api/users/login'), userLoginDetails).then((res) => {
            const data = res.data;
            if (data.success) {
                const token = data.token;
                delete data.token;
                localStorage.setItem('jwtToken', token);
                const decodedToken = jwt.decode(token);
                return {
                    authorizationToken: token,
                    authenticatedUsername: decodedToken.username,
                    authorizedRole:decodedToken.role,
                }
            }
            return false;
        })

    } catch (exp) {
        throw (exp);
    }
}