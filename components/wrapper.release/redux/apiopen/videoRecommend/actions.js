"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApiopenVideoRecommend = void 0;

var _apiopenService = _interopRequireDefault(require("../../../services/apiopenService"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getApiopenVideoRecommend = function getApiopenVideoRecommend(obj) {
  return function (dispatch) {
    dispatch({
      type: _constants.GET_APIOPEN_VIDEO_RECOMMEND
    });

    _apiopenService["default"].getApiopenVideoRecommend(obj).then(function (response) {
      var params = {
        recommendObj: null
      };

      if (response) {
        params.recommendObj = response.result;
      }

      dispatch(_objectSpread({
        type: _constants.GET_APIOPEN_VIDEO_RECOMMEND_SUCCEEDED
      }, params));
    })["catch"](function (e) {
      dispatch({
        type: _constants.GET_APIOPEN_VIDEO_RECOMMEND_FAILED,
        message: e.message
      });
    });
  };
};

exports.getApiopenVideoRecommend = getApiopenVideoRecommend;