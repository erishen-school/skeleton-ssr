"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMathQuizItems = exports.getMathQuizItems = exports.getMathQuiz = void 0;

var _mathService = _interopRequireDefault(require("../../../services/mathService"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getMathQuiz = function getMathQuiz() {
  return function (dispatch) {
    dispatch({
      type: _constants.GET_MATH_QUIZ
    });

    _mathService["default"].getMathQuiz().then(function (response) {
      var params = {
        quizObj: null
      };

      if (response) {
        params.quizObj = response;
      }

      dispatch(_objectSpread({
        type: _constants.GET_MATH_QUIZ_SUCCEEDED
      }, params));
    })["catch"](function (e) {
      dispatch({
        type: _constants.GET_MATH_QUIZ_FAILED,
        message: e.message
      });
    });
  };
};

exports.getMathQuiz = getMathQuiz;

var getMathQuizItems = function getMathQuizItems() {
  return function (dispatch) {
    dispatch({
      type: _constants.GET_MATH_QUIZ_ITEMS
    });

    _mathService["default"].getMathQuizItems().then(function (response) {
      var params = {
        answerObj: null
      };

      if (response) {
        params.answerObj = response;
      }

      dispatch(_objectSpread({
        type: _constants.GET_MATH_QUIZ_ITEMS_SUCCEEDED
      }, params));
    })["catch"](function (e) {
      dispatch({
        type: _constants.GET_MATH_QUIZ_ITEMS_FAILED,
        message: e.message
      });
    });
  };
};

exports.getMathQuizItems = getMathQuizItems;

var setMathQuizItems = function setMathQuizItems(obj) {
  return function (dispatch) {
    dispatch({
      type: _constants.SET_MATH_QUIZ_ITEMS
    });

    _mathService["default"].setMathQuizItems(obj).then(function (response) {
      var params = {
        answerObj: null
      };

      if (response) {
        params.answerObj = response;
      }

      dispatch(_objectSpread({
        type: _constants.SET_MATH_QUIZ_ITEMS_SUCCEEDED
      }, params));
    })["catch"](function (e) {
      dispatch({
        type: _constants.SET_MATH_QUIZ_ITEMS_FAILED,
        message: e.message
      });
    });
  };
};

exports.setMathQuizItems = setMathQuizItems;