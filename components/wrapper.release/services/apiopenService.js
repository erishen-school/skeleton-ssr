"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fetch = _interopRequireDefault(require("../helper/fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by lei_sun on 2019/6/10.
 */
var serviceObj = {};

serviceObj.getApiopenVideoRecommend = function (id) {
  return new Promise(function (resolve, reject) {
    _fetch["default"].ajaxDirectGetPromise('https://api.apiopen.top/videoRecommend?id=' + id, {}).then(resolve)["catch"](reject);
  });
};

var _default = serviceObj;
exports["default"] = _default;