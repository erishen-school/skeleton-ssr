'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var quizState = {
    quizObj: {
        num1: 0,
        num2: 0,
        operator: '+',
        selection: [0, 0, 0, 0],
        answer: 0
    },
    answerObj: {
        rightLen: 0,
        currentLen: 0
    },
    loadingStatus: 'loading'
}; /**
    * Created by lei_sun on 2019/6/6.
    */


var quiz = function quiz() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : quizState;
    var action = arguments[1];

    var newState = _lodash2.default.cloneDeep(state);

    switch (action.type) {
        case _constants.GET_MATH_QUIZ_SUCCEEDED:
            newState.quizObj = action.quizObj;
            newState.loadingStatus = 'done';
            return newState;
        case _constants.GET_MATH_QUIZ_ITEMS_SUCCEEDED:
            newState.answerObj = action.answerObj;
            return newState;
        case _constants.SET_MATH_QUIZ_ITEMS_SUCCEEDED:
            newState.answerObj = action.answerObj;
            return newState;
        default:
            return state;
    }
};

var rootReducer = (0, _redux.combineReducers)({
    quiz: quiz
});

exports.default = rootReducer;