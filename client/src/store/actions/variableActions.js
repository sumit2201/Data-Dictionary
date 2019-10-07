import { actionTypes } from './actionTypes';


export const getAllVariablesMeta = (fetchObj) => {
    return {
        type: actionTypes.FETCH_ALL_VARIABLES_META,
        payload: fetchObj,
    }
}

export const getSingleVariableMeta = (variableId) => {
    return {
        type: actionTypes.FETCH_SINGLE_VARIABLES_META,
        payload: {variableId},
    }
}


export const addVariable = (vairableMeta) => {
    return {
        type: actionTypes.ADD_VARIABLE,
        payload: vairableMeta
    }
};

export const editVariable = (vairableMeta) => {
    return {
        type: actionTypes.EDIT_VARIABLE,
        payload: vairableMeta
    }
};

export const deleteVariable = (variableId) => {
    return {
        type: actionTypes.DELETE_VARIABLE,
        payload: {variableId}
    }
};

export const handleVariableError = (error) => {
    return {
        type: actionTypes.VARIABLE_REQUEST_ERROR,
        payload: error
    }
};

