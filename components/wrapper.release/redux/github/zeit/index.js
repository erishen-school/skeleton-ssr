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

var GithubZeit = /*#__PURE__*/function (_BasePageComponent) {
  _inherits(GithubZeit, _BasePageComponent);

  var _super = _createSuper(GithubZeit);

  function GithubZeit(props) {
    var _this;

    _classCallCheck(this, GithubZeit);

    _this = _super.call(this, props);

    _this.setRedux(_reducers["default"], actions);

    return _this;
  }

  _createClass(GithubZeit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.unsubscribe = this.store.subscribe(function () {
        _this2.setState(_this2.store.getState());
      });

      if (!this.preloadedState || window.isStatic == 'true') {
        this.action.getGithubZeitNext();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var zeit = this.state.zeit;
      var nextObj = zeit.nextObj,
          loadingStatus = zeit.loadingStatus;
      console.log('nextObj', nextObj, loadingStatus);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "github-zeit"
      }, /*#__PURE__*/_react["default"].createElement(_H1SkeletonComponent["default"], {
        item: nextObj.full_name,
        loadingStatus: loadingStatus
      }), /*#__PURE__*/_react["default"].createElement(_H1SkeletonComponent["default"], {
        item: nextObj.archive_url,
        loadingStatus: loadingStatus
      }), /*#__PURE__*/_react["default"].createElement(_H1SkeletonComponent["default"], {
        item: nextObj.assignees_url,
        loadingStatus: loadingStatus
      }), /*#__PURE__*/_react["default"].createElement(_H1SkeletonComponent["default"], {
        item: nextObj.blobs_url,
        loadingStatus: loadingStatus
      }), /*#__PURE__*/_react["default"].createElement(_H1SkeletonComponent["default"], {
        item: nextObj.branches_url,
        loadingStatus: loadingStatus
      }), /*#__PURE__*/_react["default"].createElement(_H1SkeletonComponent["default"], {
        item: nextObj.clone_url,
        loadingStatus: loadingStatus
      }));
    }
  }]);

  return GithubZeit;
}(_BasePageComponent2["default"]);

exports["default"] = GithubZeit;