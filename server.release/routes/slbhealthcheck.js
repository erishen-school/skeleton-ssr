"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _version = _interopRequireDefault(require("../config/version"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by lei_sun on 2018/2/9.
 */
var router = _express["default"].Router();

function showHTML(res, content) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(content);
}

router.get('/', function (req, res) {
  showHTML(res, 'version: ' + _version["default"]);
});
var _default = router;
exports["default"] = _default;