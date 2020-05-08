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
var videoRecommendState = {
  recommendObj: {},
  loadingStatus: 'loading'
};

var videoRecommend = function videoRecommend() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : videoRecommendState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  var newState = _lodash["default"].cloneDeep(state);

  switch (action.type) {
    case _constants.GET_APIOPEN_VIDEO_RECOMMEND_SUCCEEDED:
      newState.recommendObj = action.recommendObj;
      newState.loadingStatus = 'done';
      return newState;

    default:
      return state;
  }
};

var rootReducer = (0, _redux.combineReducers)({
  videoRecommend: videoRecommend
});
var _default = rootReducer;
exports["default"] = _default;