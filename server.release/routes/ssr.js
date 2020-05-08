"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _moment = _interopRequireDefault(require("moment"));

var _render = _interopRequireDefault(require("./util/render"));

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by lei_sun on 2018/5/31.
 */
var wrapperDic = process.env.WRAPPER;

var Config = require("../../client/config/static")["default"].getConfig(wrapperDic);

var router = _express["default"].Router();

router.use(function timeLog(req, res, next) {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log((0, _moment["default"])().format('YYYY-MM-DD HH:mm:ss') + ' ' + fullUrl);
  next();
});

var handleConfig = function handleConfig(item, action) {
  if (action == undefined) action = '';

  if (item) {
    var ssr = item.ssr == undefined ? true : item.ssr;

    if (ssr) {
      router.get('/' + action, function (req, res) {
        _render["default"].handleSSR(item, action, req, res);
      });
    }
  }
};

var index = 0;

_lodash["default"].each(Config, function (item, key) {
  //console.log(item, key, index);
  if (index == 0) {
    handleConfig(item);
  }

  handleConfig(item, item.action);
  index++;
});

var _default = router;
exports["default"] = _default;