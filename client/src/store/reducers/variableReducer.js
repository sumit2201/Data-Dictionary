import { actionTypes } from '../actions/actionTypes';

const initialState = {
    allVariablesMeta: [],
    alertMsg: "",
    singleVariableMeta: {},
};

const reducer = (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionTypes.ADD_VARIABLE_SUCCESS:
        case actionTypes.EDIT_VARIABLE_SUCCESS:
        case actionTypes.DELETE_VARIABLE_SUCCESS:
            return {
                ...state,
                alertMsg: payload
            };

        case actionTypes.GOT_ALL_VARIABLES_META:
            return {
                ...state,
                allVariablesMeta: payload
            };
        case actionTypes.GOT_SINGLE_VARIABLES_META:
            return {
                ...state,
                singleVariableMeta: payload
            };
        default:
            return {
                ...state,
                alertMsg:"",
            }
    }
};

export default reducer;
