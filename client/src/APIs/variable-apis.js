import Axios from 'axios';
import { API_END_POINT } from '../config';

const prepareURL = apiUrl => API_END_POINT + apiUrl;

const getCommonHeader = () => {
    return {
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    }
};

export const addVariableRequest = (singleVariableMeta) => {
    try {
        return Axios.post(prepareURL('/api/variables/add'), singleVariableMeta,
            { headers: getCommonHeader() }).then((res) => {
                const data = res.data;
                if (data.success) {
                    return true;
                }
                return false;
            })

    } catch (exp) {
        throw (exp);
    }
}

export const editVariableRequest = (singleVariableMeta) => {
    try {
        return Axios.post(prepareURL('/api/variables/edit/' + singleVariableMeta._id), singleVariableMeta,
            { headers: getCommonHeader() }).then((res) => {
                const data = res.data;
                if (data.success) {
                    return true;
                }
                return false;
            })

    } catch (exp) {
        throw (exp);
    }
}

export const fetchAllVariablesMeta = (fetchDetails) => {
    try {
        return Axios.get(prepareURL('/api/variables/'),
            {
                params: fetchDetails,
                headers: getCommonHeader()
            }).then((res) => {
                const data = res.data;
                if (data.success) {
                    return data.allVariablesMeta;
                }
                return false;
            })

    } catch (exp) {
        throw (exp);
    }
}

export const fetchSingleVariableMeta = (variableId) => {
    try {
        return Axios.get(prepareURL('/api/variables/' + variableId), {},
            { headers: getCommonHeader() }).then((res) => {
                const data = res.data;
                if (data.success) {
                    return data.singleVariableMeta;
                }
                return false;
            })

    } catch (exp) {
        throw (exp);
    }
}

export const deleteSingleVariableMeta = (variableId) => {
    try {
        return Axios.delete(prepareURL('/api/variables/delete/' + variableId),
            { headers: getCommonHeader() }).then((res) => {
                const data = res.data;
                if (data.success) {
                    return true;
                }
                return false;
            })

    } catch (exp) {
        throw (exp);
    }
}