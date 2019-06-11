'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var videoRecommendState = {
    recommendObj: {},
    loadingStatus: 'loading'
}; /**
    * Created by lei_sun on 2019/6/6.
    */


var videoRecommend = function videoRecommend() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : videoRecommendState;
    var action = arguments[1];

    var newState = _lodash2.default.cloneDeep(state);

    switch (action.type) {
        case _constants.GET_APIOPEN_VIDEO_RECOMMEND_SUCCEEDED:
            newState.recommendObj = action.recommendObj;
            newState.loadingStatus = 'done';
            return newState;
        default:
            return state;
    }
};

var rootReducer = (0, _redux.combineReducers)({
    videoRecommend: videoRecommend
});

exports.default = rootReducer;