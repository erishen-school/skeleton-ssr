"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fetch = _interopRequireDefault(require("../helper/fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by lei_sun on 2019/6/6.
 */
var serviceObj = {};

serviceObj.getGithubZeitNext = function () {
  return new Promise(function (resolve, reject) {
    if (window.isStatic !== 'true') {
      _fetch["default"].ajaxDirectGetPromise('https://api.github.com/repos/zeit/next.js', {}).then(resolve)["catch"](reject);
    }
  });
};

var _default = serviceObj;
exports["default"] = _default;