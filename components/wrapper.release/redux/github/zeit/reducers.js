'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var zeitState = {
    nextObj: {},
    loadingStatus: 'loading'
}; /**
    * Created by lei_sun on 2019/6/6.
    */


var zeit = function zeit() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : zeitState;
    var action = arguments[1];

    var newState = _lodash2.default.cloneDeep(state);

    switch (action.type) {
        case _constants.GET_GITHUB_ZEIT_NEXT_SUCCEEDED:
            newState.nextObj = action.nextObj;
            newState.loadingStatus = 'done';
            return newState;
        default:
            return state;
    }
};

var rootReducer = (0, _redux.combineReducers)({
    zeit: zeit
});

exports.default = rootReducer;