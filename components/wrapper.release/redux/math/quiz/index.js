"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reducers = _interopRequireDefault(require("./reducers"));

var actions = _interopRequireWildcard(require("./actions"));

var _H1SkeletonComponent = _interopRequireDefault(require("../../common/H1SkeletonComponent"));

var _BasePageComponent2 = _interopRequireDefault(require("../../common/BasePageComponent"));

var _util = _interopRequireDefault(require("../../../helper/util"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MathQuiz = /*#__PURE__*/function (_BasePageComponent) {
  _inherits(MathQuiz, _BasePageComponent);

  var _super = _createSuper(MathQuiz);

  function MathQuiz(props) {
    var _this;

    _classCallCheck(this, MathQuiz);

    _this = _super.call(this, props);

    _this.setRedux(_reducers["default"], actions);

    return _this;
  }

  _createClass(MathQuiz, [{
    key: "componentDidMount",
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
    key: "clickRow",
    value: function clickRow(e, item) {
      var _this3 = this;

      console.log('clickRow', $(e.target));
      var currentBackgroundColor = $(e.target).css('background-color');

      if (currentBackgroundColor == 'rgb(255, 193, 193)') {
        $(e.target).css('background-color', 'rgb(238, 180, 180)');
      } else if (currentBackgroundColor == 'rgb(255, 106, 106)') {
        $(e.target).css('background-color', 'rgb(238, 99, 99)');
      }

      setTimeout(function () {
        var quiz = _this3.state.quiz;
        var quizObj = quiz.quizObj; //console.log('clickRow', item);

        var answerFlag = false;

        if (item == quizObj.answer) {
          answerFlag = true;
          quizObj.isRight = true;
        }

        quizObj.userAnswer = item;

        _this3.action.setMathQuizItems(quizObj);

        _this3.action.getMathQuiz();

        _this3.setState({
          popupFlag: true,
          answerFlag: answerFlag
        });

        $('.question-select-row').css('background-color', '');
      }, 500);
      setTimeout(function () {
        _this3.setState({
          popupFlag: false
        });
      }, 2500);
    }
  }, {
    key: "clickPopup",
    value: function clickPopup() {
      var popupFlag = this.state.popupFlag;
      console.log('popupFlag', popupFlag);
      this.setState({
        popupFlag: !popupFlag
      });
    }
  }, {
    key: "getQuestionSelectRow",
    value: function getQuestionSelectRow(selection) {
      var _this4 = this;

      var content = [];

      _lodash["default"].each(selection, function (item, index) {
        if (item != undefined) {
          var evenClass = '';
          if (index % 2 == 0) evenClass = 'even';
          content.push( /*#__PURE__*/_react["default"].createElement("div", {
            key: "selection" + index,
            className: "question-select-row " + evenClass,
            onClick: function onClick(e) {
              return _this4.clickRow(e, item);
            }
          }, /*#__PURE__*/_react["default"].createElement("p", null, item)));
        }
      });

      return content;
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$state = this.state,
          quiz = _this$state.quiz,
          popupFlag = _this$state.popupFlag,
          answerFlag = _this$state.answerFlag;
      var quizObj = quiz.quizObj,
          answerObj = quiz.answerObj;
      var rightLen = answerObj.rightLen,
          currentLen = answerObj.currentLen;
      var rightRatio = 0;

      if (currentLen > 0) {
        rightRatio = parseInt(rightLen / currentLen * 100, 10);
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "math-quiz"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "wrapper"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "quiz-area"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "question-row"
      }, /*#__PURE__*/_react["default"].createElement("p", null, quizObj.num1, " ", quizObj.operator, " ", quizObj.num2, " = ?")), /*#__PURE__*/_react["default"].createElement("div", {
        className: "question-select-area"
      }, this.getQuestionSelectRow(quizObj.selection))), currentLen > 0 && /*#__PURE__*/_react["default"].createElement("div", {
        className: "answer-area"
      }, "\u7B54\u9898\u6B63\u786E\u6570: ", rightLen, " / ", currentLen, "   \u51C6\u786E\u7387: ", rightRatio, "%")), popupFlag && /*#__PURE__*/_react["default"].createElement("div", {
        className: "popup",
        onClick: function onClick() {
          return _this5.clickPopup();
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "content"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "wrapper"
      }, answerFlag ? "恭喜你答对了" : "再接再励，继续努力"))));
    }
  }]);

  return MathQuiz;
}(_BasePageComponent2["default"]);

exports["default"] = MathQuiz;