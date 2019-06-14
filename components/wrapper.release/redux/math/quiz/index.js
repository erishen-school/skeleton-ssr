'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _H1SkeletonComponent = require('../../common/H1SkeletonComponent');

var _H1SkeletonComponent2 = _interopRequireDefault(_H1SkeletonComponent);

var _BasePageComponent2 = require('../../common/BasePageComponent');

var _BasePageComponent3 = _interopRequireDefault(_BasePageComponent2);

var _util = require('../../../helper/util');

var _util2 = _interopRequireDefault(_util);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lei_sun on 2019/6/6.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var MathQuiz = function (_BasePageComponent) {
    _inherits(MathQuiz, _BasePageComponent);

    function MathQuiz(props) {
        _classCallCheck(this, MathQuiz);

        var _this = _possibleConstructorReturn(this, (MathQuiz.__proto__ || Object.getPrototypeOf(MathQuiz)).call(this, props));

        _this.setRedux(_reducers2.default, actions);
        return _this;
    }

    _createClass(MathQuiz, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.unsubscribe = this.store.subscribe(function () {
                _this2.setState(_this2.store.getState());
            });

            this.state.popupFlag = false;
            this.state.answerFlag = false;

            if (!this.preloadedState || window.isStatic == 'true') {
                this.action.getMathQuiz();
                this.action.getMathQuizItems();
            }
        }
    }, {
        key: 'clickRow',
        value: function clickRow(item) {
            var _this3 = this;

            var quiz = this.state.quiz;
            var quizObj = quiz.quizObj;
            //console.log('clickRow', item);

            var answerFlag = false;
            if (item == quizObj.answer) {
                answerFlag = true;
                quizObj.isRight = true;
            }

            quizObj.userAnswer = item;
            this.action.setMathQuizItems(quizObj);
            this.action.getMathQuiz();

            this.setState({
                popupFlag: true,
                answerFlag: answerFlag
            });

            setTimeout(function () {
                _this3.setState({
                    popupFlag: false
                });
            }, 2000);
        }
    }, {
        key: 'clickPopup',
        value: function clickPopup() {
            var popupFlag = this.state.popupFlag;

            console.log('popupFlag', popupFlag);

            this.setState({
                popupFlag: !popupFlag
            });
        }
    }, {
        key: 'getQuestionSelectRow',
        value: function getQuestionSelectRow(selection) {
            var _this4 = this;

            var content = [];
            _lodash2.default.each(selection, function (item, index) {
                if (item != undefined) {
                    content.push(_react2.default.createElement(
                        'div',
                        { key: "selection" + index, className: 'question-select-row', onClick: function onClick() {
                                return _this4.clickRow(item);
                            } },
                        _react2.default.createElement(
                            'p',
                            null,
                            item
                        )
                    ));
                }
            });
            return content;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var _state = this.state,
                quiz = _state.quiz,
                popupFlag = _state.popupFlag,
                answerFlag = _state.answerFlag;
            var quizObj = quiz.quizObj,
                answerObj = quiz.answerObj;
            var rightLen = answerObj.rightLen,
                currentLen = answerObj.currentLen;


            var rightRatio = 0;
            if (currentLen > 0) {
                rightRatio = parseInt(rightLen / currentLen * 100, 10);
            }

            return _react2.default.createElement(
                'div',
                { className: 'math-quiz' },
                _react2.default.createElement(
                    'div',
                    { className: 'wrapper' },
                    _react2.default.createElement(
                        'div',
                        { className: 'quiz-area' },
                        _react2.default.createElement(
                            'div',
                            { className: 'question-row' },
                            _react2.default.createElement(
                                'p',
                                null,
                                quizObj.num1,
                                ' ',
                                quizObj.operator,
                                ' ',
                                quizObj.num2,
                                ' = ?'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'question-select-area' },
                            this.getQuestionSelectRow(quizObj.selection)
                        )
                    ),
                    currentLen > 0 && _react2.default.createElement(
                        'div',
                        { className: 'answer-area' },
                        '\u7B54\u9898\u6B63\u786E\u6570: ',
                        rightLen,
                        ' / ',
                        currentLen,
                        '   \u51C6\u786E\u7387: ',
                        rightRatio,
                        '%'
                    )
                ),
                popupFlag && _react2.default.createElement(
                    'div',
                    { className: 'popup', onClick: function onClick() {
                            return _this5.clickPopup();
                        } },
                    _react2.default.createElement(
                        'div',
                        { className: 'content' },
                        _react2.default.createElement(
                            'div',
                            { className: 'wrapper' },
                            answerFlag ? "恭喜你答对了" : "没事，继续加油"
                        )
                    )
                )
            );
        }
    }]);

    return MathQuiz;
}(_BasePageComponent3.default);

exports.default = MathQuiz;