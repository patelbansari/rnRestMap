import {  REST_LIST,  } from "../action/Action";

const initialState = {
    restList: [],
}
export default CommonReducers = (state = initialState, action) => {
    switch (action.type) {
        case REST_LIST:
            return {
                ...state,
                restList: action.list
            };
        default:
            return state;
    }
};
