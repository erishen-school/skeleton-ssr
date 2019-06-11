/**
 * Created by lei_sun on 2019/6/6.
 */
import { combineReducers } from 'redux';
import _ from 'lodash';
import {
    GET_GITHUB_ZEIT_NEXT_SUCCEEDED
} from './constants';

const zeitState = {
    nextObj: {},
    loadingStatus: 'loading'
};

const zeit = (state = zeitState, action) => {
    let newState = _.cloneDeep(state);

    switch (action.type) {
        case GET_GITHUB_ZEIT_NEXT_SUCCEEDED:
            newState.nextObj = action.nextObj;
            newState.loadingStatus = 'done';
            return newState;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    zeit
});

export default rootReducer;