"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _moment = _interopRequireDefault(require("moment"));

var _version = _interopRequireDefault(require("../../config/version"));

var _fetch = _interopRequireDefault(require("../../service/fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by lei_sun on 2018/5/22.
 */
var router = _express["default"].Router();

router.use(function timeLog(req, res, next) {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log((0, _moment["default"])().format('YYYY-MM-DD HH:mm:ss') + ' ' + fullUrl);
  next();
});
router.get('/about', function (req, res) {
  var obj = {};
  obj.version = 'about: ' + _version["default"];

  _fetch["default"].showJSON(res, obj);
});
router.get('/*', function (req, res) {
  var obj = {};
  obj.version = 'api: ' + _version["default"];

  _fetch["default"].showJSON(res, obj);
});
var _default = router;
exports["default"] = _default;