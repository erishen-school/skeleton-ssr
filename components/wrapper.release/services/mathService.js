'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fetch = require('../helper/fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _util = require('../helper/util');

var _util2 = _interopRequireDefault(_util);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serviceObj = {}; /**
                      * Created by lei_sun on 2019/6/14.
                      */


serviceObj.getMathQuiz = function () {
    return new Promise(function (resolve, reject) {
        if (typeof window != 'undefined') {
            var currentItem = window.localStorage.getItem('MATH_QUIZ_CURRENT_ITEM');
            if (currentItem == undefined) {
                var operators = ['+', '-'];
                var operatorRandom = _util2.default.getRandomNum(0, 1);
                var num1 = _util2.default.getRandomNum(1, 20);
                var num2 = _util2.default.getRandomNum(1, 20);
                var numTemp = 0;
                var numOperator = '+';
                var answer = 0;
                var selection = [];

                if (operators[operatorRandom] != undefined) {
                    numOperator = operators[operatorRandom];
                }

                if (numOperator == '-' && num2 > num1) {
                    numTemp = num1;
                    num1 = num2;
                    num2 = numTemp;
                }

                switch (numOperator) {
                    case '+':
                        answer = num1 + num2;
                        selection.push(_util2.default.getRandomNum(1, 40));
                        selection.push(answer + 1);
                        selection.push(answer - 1);
                        selection.push(answer);
                        selection = _lodash2.default.shuffle(selection);
                        break;
                    case '-':
                        answer = num1 - num2;
                        selection.push(_util2.default.getRandomNum(1, 30));
                        selection.push(answer + 1);
                        if (answer > 1) selection.push(answer - 1);else selection.push(answer + 2);
                        selection.push(answer);
                        selection = _lodash2.default.shuffle(selection);
                        break;
                }

                console.log('getMathQuiz', num1, numOperator, num2, answer, selection);

                var quizObj = {
                    num1: num1,
                    num2: num2,
                    operator: numOperator,
                    selection: selection,
                    answer: answer
                };

                window.localStorage.setItem('MATH_QUIZ_CURRENT_ITEM', JSON.stringify(quizObj));
                resolve(quizObj);
            } else {
                currentItem = JSON.parse(currentItem);
                resolve(currentItem);
            }
        }
    });
};

serviceObj.getMathQuizItems = function () {
    return new Promise(function (resolve, reject) {
        if (typeof window != 'undefined') {
            var currentItems = window.localStorage.getItem('MATH_QUIZ_ITEMS');

            if (currentItems == undefined) {
                currentItems = [];
            } else {
                currentItems = JSON.parse(currentItems);
            }

            var rightItems = _lodash2.default.filter(currentItems, function (o) {
                return o.isRight;
            });

            resolve({
                rightLen: rightItems.length,
                currentLen: currentItems.length
            });
        }
    });
};

serviceObj.setMathQuizItems = function (obj) {
    return new Promise(function (resolve, reject) {
        console.log('setMathQuizItems', obj);

        if (typeof window != 'undefined') {

            var currentItems = window.localStorage.getItem('MATH_QUIZ_ITEMS');

            if (currentItems == undefined) {
                currentItems = [];
            } else {
                currentItems = JSON.parse(currentItems);
            }

            console.log('currentItems', currentItems);

            if (currentItems.length >= 100) currentItems.shift();

            currentItems.push(obj);

            var rightItems = _lodash2.default.filter(currentItems, function (o) {
                return o.isRight;
            });
            console.log('rightItems', rightItems);
            window.localStorage.setItem('MATH_QUIZ_ITEMS', JSON.stringify(currentItems));
            window.localStorage.removeItem('MATH_QUIZ_CURRENT_ITEM');

            resolve({
                rightLen: rightItems.length,
                currentLen: currentItems.length
            });
        }
    });
};

exports.default = serviceObj;