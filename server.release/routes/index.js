"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _project = _interopRequireDefault(require("../config/project"));

var _slbhealthcheck = _interopRequireDefault(require("./slbhealthcheck"));

var _api = _interopRequireDefault(require("./api"));

var _ssr = _interopRequireDefault(require("./ssr"));

var _static = _interopRequireDefault(require("./static"));

var _util = _interopRequireDefault(require("./util"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var serverPrefix = _project["default"].serverPrefix;
var serverUrls = _project["default"].serverUrls;

var utilGoRouter = function utilGoRouter(controller, params) {
  if (params == undefined) {
    params = {};
  }

  if (controller == 'react') {
    params.react = true;
  }

  return _util["default"].goRoute(controller, params);
};

var indexRouter = function indexRouter() {
  return utilGoRouter('react');
};

function _default(app) {
  app.use('/', indexRouter());

  _lodash["default"].each(serverUrls, function (item, key) {
    var url = item.url;
    var ssr = item.ssr;

    if (serverPrefix != '') {
      var replaceUrl = serverPrefix.replace('*', url);

      if (ssr) {
        app.use(replaceUrl + '/', _ssr["default"]);
      } else {
        app.use(replaceUrl + '/', indexRouter());
      }

      app.use(replaceUrl + '/slbhealthcheck*', _slbhealthcheck["default"]);
      app.use(replaceUrl + '/api', _api["default"]);
      app.use(replaceUrl + '/static', _static["default"]);

      if (ssr) {
        app.use(replaceUrl + '/*', _ssr["default"]);
      } else {
        app.use(replaceUrl + '/*', indexRouter());
      }
    }
  });
}

;