'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _version = require('../config/version');

var _version2 = _interopRequireDefault(_version);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by lei_sun on 2018/2/9.
 */
var router = _express2.default.Router();

function showHTML(res, content) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(content);
}

router.get('/', function (req, res) {
  showHTML(res, 'version: ' + _version2.default);
});

exports.default = router;