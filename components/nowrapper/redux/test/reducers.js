/**
 * Created by lei_sun on 2017/11/6.
 */

import { combineReducers } from 'redux';

import {
    INIT_PAGE, ADD_PAGE_NUM, SUBTRACT_PAGE_NUM, FINISH_LOADING
} from './actions';

const pageNum = (state = 1, action) => {
    switch (action.type) {
        case INIT_PAGE:
            return 1;
        case ADD_PAGE_NUM:
            return state + 1;
        case SUBTRACT_PAGE_NUM:
            return state - 1;
        default:
            return state
    }
};

const loadingStatus = (state = 'loading', action) => {
    switch (action.type) {
        case INIT_PAGE:
            return 'loading';
        case FINISH_LOADING:
            return 'done';
        default:
            return state
    }
};

const rootReducer = combineReducers({
    pageNum,
    loadingStatus
});

export default rootReducer;