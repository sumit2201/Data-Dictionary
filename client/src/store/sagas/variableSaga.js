import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes } from '../actions/actionTypes';
import { fetchAllVariablesMeta, fetchSingleVariableMeta, addVariableRequest, editVariableRequest, deleteSingleVariableMeta } from '../../APIs/variable-apis';
import { handleVariableError } from '../actions/variableActions';

 
export function* watchVariableActions() {
    yield takeLatest(actionTypes.ADD_VARIABLE,callAddVariableMeta);   
    yield takeLatest(actionTypes.EDIT_VARIABLE,callEditVariableMeta);   
    yield takeLatest(actionTypes.FETCH_ALL_VARIABLES_META,callFetchAllVariablesMeta);
    yield takeLatest(actionTypes.FETCH_SINGLE_VARIABLES_META,callFetchSingleVariableMeta);
    yield takeLatest(actionTypes.DELETE_VARIABLE,callDeleteSingleVariableMeta);
}

 
function* callAddVariableMeta(action) {
    try {
        const variableDetails = action.payload;
        const response = yield call(addVariableRequest, variableDetails);
        if(response){
            const msg = "Variable meta added successfully";
            yield put({ type: actionTypes.ADD_VARIABLE_SUCCESS, payload: msg })
        }else{
            const msg = "Error in adding variable meta information";
            yield put(handleVariableError(msg));
        }
    } catch(error) {
        const msg = "Add variable request failed due to error "+ error;
        yield put(handleVariableError(msg));
    }
}

function* callEditVariableMeta(action) {
    try {
        const variableDetails = action.payload;
        const response = yield call(editVariableRequest, variableDetails);
        if(response){
            const msg = "Variable meta updated successfully";
            yield put({ type: actionTypes.ADD_VARIABLE_SUCCESS, payload: msg })
        }else{
            const msg = "Error in adding variable meta information";
            yield put(handleVariableError(msg));
        }
    } catch(error) {
        const msg = "Add variable request failed due to error "+ error;
        yield put(handleVariableError(msg));
    }
}

function* callFetchAllVariablesMeta(action){
    try {
        const response = yield call(fetchAllVariablesMeta,action.payload);
        if(response){
            yield put({ type: actionTypes.GOT_ALL_VARIABLES_META, payload: response })
        }else{
            const msg = "Error in fetching variables meta information";
            yield put(handleVariableError(msg));
        }
    } catch(error) {
        const msg = "Add variable request failed due to error "+ error;
        yield put(handleVariableError(msg));
    }
}

function* callFetchSingleVariableMeta(action){
    try {
        const response = yield call(fetchSingleVariableMeta,action.payload.variableId);
        
        if(response){
            yield put({ type: actionTypes.GOT_SINGLE_VARIABLES_META, payload: response })
        }else{
            const msg = "Error in fetching single variable's meta information";
            yield put(handleVariableError(msg));
        }
    } catch(error) {
        const msg = "Fetch single variable's meta request failed due to error "+ error;
        yield put(handleVariableError(msg));
    }
}

function* callDeleteSingleVariableMeta(action){
    try {
        const response = yield call(deleteSingleVariableMeta,action.payload.variableId);
        
        if(response){
            yield put({ type: actionTypes.DELETE_VARIABLE_SUCCESS, payload: "Variable meta deleted successfully"})
        }else{
            const msg = "Error in deleting single variable's meta information";
            yield put(handleVariableError(msg));
        }
    } catch(error) {
        const msg = "Delete single variable's meta request failed due to error "+ error;
        yield put(handleVariableError(msg));
    }
}