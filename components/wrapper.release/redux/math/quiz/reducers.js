"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _lodash = _interopRequireDefault(require("lodash"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by lei_sun on 2019/6/6.
 */
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
};

var quiz = function quiz() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : quizState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  var newState = _lodash["default"].cloneDeep(state);

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
var _default = rootReducer;
exports["default"] = _default;