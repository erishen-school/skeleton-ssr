"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// https://github.com/bitinn/node-fetch
var https = require('https'); // https://www.ddhigh.com/2016/12/14/node-fetch-ignore-certificate.html


var http = require('http');

var appConfig = require('../../app.config');

var env = appConfig.Env;
var nodeFetchHttps = false;
var obj = {};

obj.showJSON = function (res, content) {
  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.end(JSON.stringify(content));
};

obj.show404 = function (res) {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.end('<html><body><div>404</div></body></html>');
}; // flag: true => 不调用 showJSON 方法, false, undefined => 反之


obj.getDirect = function (url, body, req, res, flag) {
  var _this = this;

  console.log('getDirect', url);

  if (body == undefined) {
    body = {};
  }

  var data = _objectSpread({}, body, req.body, req.query);

  return new Promise(function (resolve, reject) {
    var fetchObj = _objectSpread({}, data);

    (0, _nodeFetch["default"])(url, fetchObj).then(function (res) {
      return res.json();
    }).then(function (json) {
      //console.log('getDirect_json', url, json);
      if (!flag) {
        _this.showJSON(res, json);
      }

      return resolve && resolve(json);
    })["catch"](function (err) {
      //console.log('getDirect_err', url, err);
      if (!flag) {
        _this.showJSON(res, err);
      }

      return reject && reject(err);
    });
  });
};

obj.postDirect = function (url, body, req, res, flag) {
  var _this2 = this;

  console.log('postDirect', url);

  if (body == undefined) {
    body = {};
  }

  var data = _objectSpread({}, body, req.body, req.query);

  return new Promise(function (resolve, reject) {
    var fetchObj = {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        contentType: 'application/json'
      }
    };
    (0, _nodeFetch["default"])(url, fetchObj).then(function (res) {
      return res.json();
    }).then(function (json) {
      //console.log('postDirect_json', url, json);
      if (!flag) {
        _this2.showJSON(res, json);
      }

      return resolve && resolve(json);
    })["catch"](function (err) {
      //console.log('postDirect_err', url, err);
      if (!flag) {
        _this2.showJSON(res, err);
      }

      return reject && reject(err);
    });
  });
};

var _default = obj;
exports["default"] = _default;