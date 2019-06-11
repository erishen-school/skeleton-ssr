/**
 * Created by lei_sun on 2019/6/6.
 */
import { combineReducers } from 'redux';
import _ from 'lodash';
import {
    GET_APIOPEN_VIDEO_RECOMMEND_SUCCEEDED
} from './constants';

const videoRecommendState = {
    recommendObj: {},
    loadingStatus: 'loading'
};

const videoRecommend = (state = videoRecommendState, action) => {
    let newState = _.cloneDeep(state);

    switch (action.type) {
        case GET_APIOPEN_VIDEO_RECOMMEND_SUCCEEDED:
            newState.recommendObj = action.recommendObj;
            newState.loadingStatus = 'done';
            return newState;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    videoRecommend
});

export default rootReducer;