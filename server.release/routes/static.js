"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _util = _interopRequireDefault(require("../helper/util"));

var _render = _interopRequireDefault(require("./util/render"));

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _fetch = _interopRequireDefault(require("../service/fetch"));

var _project = _interopRequireDefault(require("../config/project"));

var _version = _interopRequireDefault(require("../config/version"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = _express["default"].Router();

var isRelease = process.env.RELEASE;
var wrapperDic = process.env.WRAPPER;

var Config = require("../../client/config/static")["default"].getConfig(wrapperDic, {
  isHybrid: true
});

var firstUpper = function firstUpper(str) {
  return _util["default"].firstUpperCase(str);
};

var getHtml = function getHtml() {
  return "<!DOCTYPE html>\n<html>\n    <head>\n        <meta charset=\"UTF-8\">\n    </head>\n    <body>\n        hello\n    </body>\n</html>";
};

var renderWrite = function renderWrite(req, res, route, callback) {
  var item = Config[route];
  var html = getHtml();
  var queryRelease = req.query.release;
  var originalUrl = req.originalUrl;

  if (item) {
    var action = item.action;
    console.log('action', action);

    var component = _server["default"].renderToString( /*#__PURE__*/_react["default"].createElement(item.component, null));

    var ssr = item.ssr == undefined ? true : item.ssr;
    var preloadedState = item.preloadedState;
    var apiFunc = item.apiFunc;
    var commonObj = {
      originalUrl: originalUrl,
      component: component,
      action: action,
      isStatic: 'true',
      queryRelease: queryRelease
    };

    if (ssr) {
      if (!apiFunc) {
        html = _render["default"].renderFullPage(_objectSpread({
          preloadedState: preloadedState
        }, commonObj));
        renderReactHome(req, res, action, html, callback);
      } else {
        apiFunc(_fetch["default"], req, res).then(function (preloadedState) {
          html = _render["default"].renderFullPage(_objectSpread({
            preloadedState: preloadedState
          }, commonObj));
          renderReactHome(req, res, action, html, callback);
        })["catch"](function (err) {
          console.log('apiFunc_err', err);
          html = _render["default"].renderFullPage(_objectSpread({}, commonObj));
          renderReactHome(req, res, action, html, callback);
        });
      }
    } else {
      renderReactHome(req, res, action, html, callback);
    }
  } else {
    renderReactHome(req, res, route, html, callback);
  }
};

var renderReactHome = function renderReactHome(req, res, route, html, callback) {
  res.render('React/Home.html', {
    html: html
  }, function (err, resHTML) {
    if (!err) {
      var filename = route;

      if (filename != '') {
        console.log('filename', filename);
        var filePathPrefix = _path["default"].join(__dirname, '../../public') + _project["default"].hybridDictionary + '/';
        if (!_fs["default"].existsSync(filePathPrefix)) _fs["default"].mkdirSync(filePathPrefix);

        if (filename.indexOf('/') != -1) {
          var filenameArr = filename.split('/');
          var filenameArrLen = filenameArr.length;
          var dir = filePathPrefix;

          if (filenameArrLen == 2) {
            dir += filenameArr[0];
          } else if (filenameArrLen == 3) {
            dir += filenameArr[0] + '/' + filenameArr[1];
            if (!_fs["default"].existsSync(filenameArr[0])) _fs["default"].mkdirSync(filenameArr[0]);
          } else if (filenameArrLen == 4) {
            dir += filenameArr[0] + '/' + filenameArr[1] + '/' + filenameArr[2];
            if (!_fs["default"].existsSync(filenameArr[0])) _fs["default"].mkdirSync(filenameArr[0]);
            if (!_fs["default"].existsSync(filenameArr[1])) _fs["default"].mkdirSync(filenameArr[1]);
          }

          if (!_fs["default"].existsSync(dir)) _fs["default"].mkdirSync(dir);
        }

        _fs["default"].writeFile(filePathPrefix + filename + '.html', resHTML, 'utf8', function (err) {
          if (!err) {
            console.log('The file ' + filename + '.html has been saved!');
            return callback && callback(true);
          } else {
            return callback && callback(false);
          }
        });
      } else {
        return callback && callback(false);
      }
    } else {
      console.log('err', err);
      return callback && callback(false);
    }
  });
};

var renderWriteLoop = function renderWriteLoop(req, res, routeIndex, routeArray, resultArray, callback) {
  if (resultArray == undefined) resultArray = [];
  var routeArrayLen = routeArray.length;

  if (routeArray && routeArrayLen > 0) {
    if (routeIndex >= 0 && routeIndex < routeArrayLen) {
      var route = routeArray[routeIndex];
      renderWrite(req, res, route, function (flag) {
        //console.log('renderWriteLoop', route, flag);
        resultArray.push({
          route: route,
          flag: flag
        });
        routeIndex++;
        return renderWriteLoop(req, res, routeIndex, routeArray, resultArray, callback);
      });
    } else {
      return callback && callback(resultArray);
    }
  } else {
    return callback && callback(resultArray);
  }
};

router.get('/htmlGenerate', function (req, res) {
  if (!isRelease) {
    var routeArray = Object.keys(Config);
    renderWriteLoop(req, res, 0, routeArray, [], function (result) {
      res.send(result);
    });
  } else {
    res.redirect('https://erishen.github.io');
  }
});
router.get('/*', function (req, res) {
  var obj = {};
  obj.version = 'static: ' + _version["default"];

  _fetch["default"].showJSON(res, obj);
});
var _default = router;
exports["default"] = _default;