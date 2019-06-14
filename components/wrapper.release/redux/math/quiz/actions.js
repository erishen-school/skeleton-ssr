'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setMathQuizItems = exports.getMathQuizItems = exports.getMathQuiz = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by lei_sun on 2019/6/6.
                                                                                                                                                                                                                                                                   */


var _mathService = require('../../../services/mathService');

var _mathService2 = _interopRequireDefault(_mathService);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMathQuiz = exports.getMathQuiz = function getMathQuiz() {
    return function (dispatch) {
        dispatch({
            type: _constants.GET_MATH_QUIZ
        });

        _mathService2.default.getMathQuiz().then(function (response) {
            var params = {
                quizObj: null
            };

            if (response) {
                params.quizObj = response;
            }

            dispatch(_extends({
                type: _constants.GET_MATH_QUIZ_SUCCEEDED
            }, params));
        }).catch(function (e) {
            dispatch({
                type: _constants.GET_MATH_QUIZ_FAILED,
                message: e.message
            });
        });
    };
};

var getMathQuizItems = exports.getMathQuizItems = function getMathQuizItems() {
    return function (dispatch) {
        dispatch({
            type: _constants.GET_MATH_QUIZ_ITEMS
        });

        _mathService2.default.getMathQuizItems().then(function (response) {
            var params = {
                answerObj: null
            };

            if (response) {
                params.answerObj = response;
            }

            dispatch(_extends({
                type: _constants.GET_MATH_QUIZ_ITEMS_SUCCEEDED
            }, params));
        }).catch(function (e) {
            dispatch({
                type: _constants.GET_MATH_QUIZ_ITEMS_FAILED,
                message: e.message
            });
        });
    };
};

var setMathQuizItems = exports.setMathQuizItems = function setMathQuizItems(obj) {
    return function (dispatch) {
        dispatch({
            type: _constants.SET_MATH_QUIZ_ITEMS
        });

        _mathService2.default.setMathQuizItems(obj).then(function (response) {
            var params = {
                answerObj: null
            };

            if (response) {
                params.answerObj = response;
            }

            dispatch(_extends({
                type: _constants.SET_MATH_QUIZ_ITEMS_SUCCEEDED
            }, params));
        }).catch(function (e) {
            dispatch({
                type: _constants.SET_MATH_QUIZ_ITEMS_FAILED,
                message: e.message
            });
        });
    };
};