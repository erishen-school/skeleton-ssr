"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _project = _interopRequireDefault(require("../../config/project"));

var _version = _interopRequireWildcard(require("../../config/version"));

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _fetch = _interopRequireDefault(require("../../service/fetch"));

var _config = _interopRequireDefault(require("./config"));

var _bundleConfig = _interopRequireDefault(require("./bundleConfig"));

var _controller = _interopRequireDefault(require("../../config/controller"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var minify = require('html-minifier').minify;

var RELEASE_STR = '.release';
var isDevelopment = process.env.DEVELOPMENT;
var WRAPPER = process.env.WRAPPER;
var isRelease = process.env.RELEASE;

var appConfig = require('../../../app.config');

var appEnv = appConfig.Env;
var uatAPIURL = '';
var proAPIURL = '';
var title = 'Erishen Sun';
var keywords = 'erishen';
var description = 'leisun8309@gmail.com';
var restfullApi = uatAPIURL;
var restfullApiHttps = uatAPIURL;
var serverUrls = _project["default"].serverUrls;
var aresPrefix = _project["default"].aresPrefix.uat;
var serverPrefix = _project["default"].serverPrefix;

if (appEnv == 'pro' || appEnv == 'prd') {
  restfullApi = proAPIURL;
  restfullApiHttps = proAPIURL; //aresPrefix = projectConfig.aresPrefix.pro;
}

var obj = {};

obj.renderFullPage = function (params) {
  var pageVersion = _version["default"];
  var wrapperDic = WRAPPER; //console.log('isRelease', isRelease);

  if (isRelease) {
    if (WRAPPER.indexOf(RELEASE_STR) == -1) {
      wrapperDic += RELEASE_STR;
    }
  } else {
    if (WRAPPER.indexOf(RELEASE_STR) != -1) {
      wrapperDic = WRAPPER.split(RELEASE_STR)[0];
    }
  }

  var component = params.component,
      action = params.action,
      queryRelease = params.queryRelease,
      originalUrl = params.originalUrl;
  var preloadedState = params.preloadedState,
      ssr = params.ssr,
      isStatic = params.isStatic;
  if (ssr == undefined) ssr = 'true';
  if (isStatic == undefined) isStatic = 'false';
  if (preloadedState == undefined) preloadedState = {}; //console.log('queryRelease', queryRelease);

  if (queryRelease) {
    if (wrapperDic.indexOf(RELEASE_STR) == -1) {
      wrapperDic += RELEASE_STR;
    }

    pageVersion = (0, _version.staticVersion)(); //aresPrefix = projectConfig.aresPrefix.pro;
  }

  if (isDevelopment == 1) {
    if (wrapperDic.indexOf(RELEASE_STR) != -1) {
      wrapperDic = wrapperDic.split(RELEASE_STR)[0];
    }
  } //console.log('wrapperDic', wrapperDic);
  //if((!isRelease && !queryRelease) || (isDevelopment == 1)){


  _lodash["default"].each(serverUrls, function (item, key) {
    var url = item.url;

    if (originalUrl.indexOf('/' + url + '/') != -1) {
      serverPrefix = serverPrefix.replace('*', url);
      return true;
    }
  }); //console.log('serverPrefix', serverPrefix);


  aresPrefix = serverPrefix; //}

  var webresourceBaseUrl = "".concat(aresPrefix, "/webresource/");
  var cssHref = '';
  var scriptHref = '';
  var bundleHref = 'react'; //console.log('action', action);

  var actionPrefix = '';
  var actionSuffix = '';
  var actionPrefixFlag = false;
  var actionArr = action.split('/');
  if (actionArr.length > 0) actionPrefix = actionArr[0].toLowerCase();
  if (actionArr.length > 1) actionSuffix = actionArr[1].toLowerCase();

  if (actionPrefix != '' && actionSuffix != '') {
    var configArr = _config["default"][actionPrefix];

    _lodash["default"].each(configArr, function (item, key) {
      if (item.action.toLowerCase() == actionSuffix) {
        var links = item.links;
        var scripts = item.scripts;

        if (links) {
          var linkContent = [];

          _lodash["default"].each(links, function (linkItem, linkKey) {
            linkContent.push("<link rel=\"stylesheet\" href=\"".concat(webresourceBaseUrl, "css/").concat(linkItem, "?v=").concat(pageVersion, "\" />"));
          });

          cssHref = "".concat(linkContent.join(''));
        }

        if (scripts) {
          var scriptContent = [];

          _lodash["default"].each(scripts, function (scriptItem, scriptKey) {
            scriptContent.push("<script type=\"text/javascript\" src=\"".concat(webresourceBaseUrl, "js/").concat(scriptItem, "?v=").concat(pageVersion, "\"></script>"));
          });

          scriptHref = "".concat(scriptContent.join(''));
        }
      }
    });

    _lodash["default"].each(_controller["default"].entrys, function (item, index) {
      if (actionPrefix.toLowerCase() == item && item != 'react') {
        actionPrefixFlag = true;
        return false;
      }
    });

    if (actionPrefix == 'entry') {
      cssHref = "\n                ".concat(cssHref, "\n                <style>\n                     html{\n                          font-size: 100px;\n                          font-size: 26.67vw;\n                     }\n                </style>\n            ");
    } else if (actionPrefix == 'research') {
      cssHref = "\n                ".concat(cssHref, "\n                <link rel=\"stylesheet\" href=\"").concat(aresPrefix, "/css/bootstrap.min.css?v=").concat(pageVersion, "\" />\n            ");
    } else if (actionPrefixFlag) {
      bundleHref = actionPrefix;
    }
  }

  var the3rdScript = "\n        <script type=\"text/javascript\" src=\"".concat(aresPrefix, "/js/vendor.453dc92ef6a2d33a9de0.js?v=").concat(pageVersion, "\"></script>\n    ");
  var bundleScripts = [];

  if (isDevelopment != 1) {
    if (isRelease || queryRelease) {
      the3rdScript = "\n                <script type=\"text/javascript\" src=\"".concat(aresPrefix, "/js/react.production.min.js?v=").concat(pageVersion, "\"></script>\n                <script type=\"text/javascript\" src=\"").concat(aresPrefix, "/js/react-dom.production.min.js?v=").concat(pageVersion, "\"></script>\n                <script type=\"text/javascript\" src=\"").concat(aresPrefix, "/js/vendor.a12694cb16fe497c7e63.js?v=").concat(pageVersion, "\"></script>\n            ");

      if (_bundleConfig["default"]) {
        if (actionPrefixFlag) {
          _lodash["default"].each(_bundleConfig["default"][actionPrefix], function (item, index) {
            bundleScripts.push("\n                            <script src=\"".concat(aresPrefix, "/page/").concat(item, "/bundle.js?v=").concat(pageVersion, "\" type=\"text/javascript\"></script>\n                        "));
          });
        } else {
          _lodash["default"].each(_bundleConfig["default"]['react'], function (item, index) {
            bundleScripts.push("\n                            <script src=\"".concat(aresPrefix, "/page/").concat(item, "/bundle.js?v=").concat(pageVersion, "\" type=\"text/javascript\"></script>\n                        "));
          });
        }
      }
    }
  }

  var html = "<!DOCTYPE html>\n<html>\n<head>\n    <meta charset=\"UTF-8\">\n    <title>".concat(title, "</title>\n    <link rel=\"dns-prefetch\" href=\"//www.github.com\">\n    <meta name=\"keywords\" content=").concat(keywords, " />\n    <meta name=\"description\" content=").concat(description, " />\n    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui\" />\n    <link rel=\"stylesheet\" href=\"").concat(aresPrefix, "/page/").concat(bundleHref, "/index.css?v=").concat(pageVersion, "\" />\n    <meta name=\"appBaseUrl\" content=\"").concat(aresPrefix, "/\" />\n    <meta name=\"format-detection\" content=\"telephone=no\"/>\n    <meta name=\"webresourceBaseUrl\" content=").concat(webresourceBaseUrl, " />\n    <meta name=\"restfullApi\" content=").concat(restfullApi, " />\n    <meta name=\"restfullApiHttps\" content=").concat(restfullApiHttps, " />\n\n    <!-- uc\u5F3A\u5236\u7AD6\u5C4F -->\n    <meta name=\"screen-orientation\" content=\"portrait\" />\n    <!-- QQ\u5F3A\u5236\u7AD6\u5C4F -->\n    <meta name=\"x5-orientation\" content=\"portrait\" />\n    <!-- SEO -->\n    <meta name=\"applicable-device\" content=\"mobile\" />\n    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\" />\n    <meta http-equiv=\"Cache-Control\" content=\"no-siteapp\" />\n    \n    ").concat(cssHref, "\n    \n    <script type=\"text/javascript\">\n        window.ssr = '").concat(ssr, "';\n        window.isStatic = '").concat(isStatic, "';\n        window.wrapperDic = '").concat(wrapperDic, "';\n    </script>\n</head>\n\n<body onselectstart=\"return false\" style=\"overflow-y: auto\">\n    <div id=\"headerview\" style=\"display: none;\">\n        <header id=\"main_header\" class=\"common_header\"></header>\n    </div>\n\n    <div id=\"main\">\n        <div class=\"main-frame\">\n            <div class=\"main-viewport\">\n                    <div id=\"app\"><div>").concat(component, "</div></div>\n            </div>\n            <div class=\"main-state\"></div>\n        </div>\n    </div>\n    <div id=\"footer\"></div>\n    \n    <script>\n          // \u8B66\u544A\uFF1A\u5173\u4E8E\u5728 HTML \u4E2D\u5D4C\u5165 JSON \u7684\u5B89\u5168\u95EE\u9898\uFF0C\u8BF7\u67E5\u770B\u4EE5\u4E0B\u6587\u6863\n          // http://redux.js.org/recipes/ServerRendering.html#security-considerations\n          window.__PRELOADED_STATE__ = ").concat(JSON.stringify(preloadedState).replace(/</g, "\\u003c"), ";\n    </script>\n    \n    ").concat(scriptHref, "\n\n    ").concat(the3rdScript, "\n    \n    <script src=\"").concat(aresPrefix, "/js/commonUtil.js?v=").concat(pageVersion, "\" pd_init=\"1\"></script>\n    \n    ").concat(bundleScripts.join(''), "\n    \n    <script src=\"").concat(aresPrefix, "/page/").concat(bundleHref, "/bundle.js?v=").concat(pageVersion, "\" type=\"text/javascript\"></script>\n</body>\n</html>\n    ");
  return minify(html, {
    collapseWhitespace: true,
    conservativeCollapse: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true
  });
};

obj.handleSSR = function (item, action, req, res, callback) {
  var self = this;
  var originalUrl = req.originalUrl;

  if (item) {
    var component = _server["default"].renderToString( /*#__PURE__*/_react["default"].createElement(item.component, null));

    var ssr = item.ssr == undefined ? true : item.ssr;
    var preloadedState = item.preloadedState;
    var apiFunc = item.apiFunc;
    var commonObj = {
      originalUrl: originalUrl,
      component: component,
      action: action
    };

    if (ssr) {
      if (!apiFunc) {
        res.end(self.renderFullPage(_objectSpread({
          preloadedState: preloadedState
        }, commonObj)));
      } else {
        apiFunc(_fetch["default"], req, res).then(function (preloadedState) {
          res.end(self.renderFullPage(_objectSpread({
            preloadedState: preloadedState
          }, commonObj)));
        })["catch"](function (err) {
          console.log('apiFunc_err', err);
          res.end(self.renderFullPage(_objectSpread({}, commonObj)));
        });
      }
    } else {
      return callback && callback();
    }
  } else {
    return callback && callback();
  }
};

var _default = obj;
exports["default"] = _default;