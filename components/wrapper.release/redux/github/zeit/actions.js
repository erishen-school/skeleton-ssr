"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGithubZeitNext = void 0;

var _githubService = _interopRequireDefault(require("../../../services/githubService"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getGithubZeitNext = function getGithubZeitNext(obj) {
  return function (dispatch) {
    dispatch({
      type: _constants.GET_GITHUB_ZEIT_NEXT
    });

    _githubService["default"].getGithubZeitNext(obj).then(function (response) {
      var params = {
        nextObj: null
      };

      if (response) {
        params.nextObj = response;
      }

      dispatch(_objectSpread({
        type: _constants.GET_GITHUB_ZEIT_NEXT_SUCCEEDED
      }, params));
    })["catch"](function (e) {
      dispatch({
        type: _constants.GET_GITHUB_ZEIT_NEXT_FAILED,
        message: e.message
      });
    });
  };
};

exports.getGithubZeitNext = getGithubZeitNext;