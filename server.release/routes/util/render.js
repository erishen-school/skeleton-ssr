'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by lei_sun on 2018/6/1.
                                                                                                                                                                                                                                                                   */


var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _project = require('../../config/project');

var _project2 = _interopRequireDefault(_project);

var _version = require('../../config/version');

var _version2 = _interopRequireDefault(_version);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _fetch = require('../../service/fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _bundleConfig = require('./bundleConfig');

var _bundleConfig2 = _interopRequireDefault(_bundleConfig);

var _controller = require('../../config/controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var serverUrls = _project2.default.serverUrls;
var aresPrefix = _project2.default.aresPrefix.uat;
var serverPrefix = _project2.default.serverPrefix;

if (appEnv == 'pro' || appEnv == 'prd') {
    restfullApi = proAPIURL;
    restfullApiHttps = proAPIURL;
    //aresPrefix = projectConfig.aresPrefix.pro;
}

var obj = {};
obj.renderFullPage = function (params) {
    var pageVersion = _version2.default;
    var wrapperDic = WRAPPER;
    //console.log('isRelease', isRelease);

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

    if (preloadedState == undefined) preloadedState = {};

    //console.log('queryRelease', queryRelease);
    if (queryRelease) {
        if (wrapperDic.indexOf(RELEASE_STR) == -1) {
            wrapperDic += RELEASE_STR;
        }
        pageVersion = (0, _version.staticVersion)();
        //aresPrefix = projectConfig.aresPrefix.pro;
    }

    if (isDevelopment == 1) {
        if (wrapperDic.indexOf(RELEASE_STR) != -1) {
            wrapperDic = wrapperDic.split(RELEASE_STR)[0];
        }
    }

    //console.log('wrapperDic', wrapperDic);

    //if((!isRelease && !queryRelease) || (isDevelopment == 1)){
    _lodash2.default.each(serverUrls, function (item, key) {
        var url = item.url;
        if (originalUrl.indexOf('/' + url + '/') != -1) {
            serverPrefix = serverPrefix.replace('*', url);
            return true;
        }
    });

    //console.log('serverPrefix', serverPrefix);
    aresPrefix = serverPrefix;
    //}

    var webresourceBaseUrl = aresPrefix + '/webresource/';

    var cssHref = '';
    var scriptHref = '';
    var bundleHref = 'react';
    //console.log('action', action);

    var actionPrefix = '';
    var actionSuffix = '';
    var actionPrefixFlag = false;
    var actionArr = action.split('/');

    if (actionArr.length > 0) actionPrefix = actionArr[0].toLowerCase();

    if (actionArr.length > 1) actionSuffix = actionArr[1].toLowerCase();

    if (actionPrefix != '' && actionSuffix != '') {
        var configArr = _config2.default[actionPrefix];
        _lodash2.default.each(configArr, function (item, key) {
            if (item.action.toLowerCase() == actionSuffix) {
                var links = item.links;
                var scripts = item.scripts;

                if (links) {
                    var linkContent = [];
                    _lodash2.default.each(links, function (linkItem, linkKey) {
                        linkContent.push('<link rel="stylesheet" href="' + webresourceBaseUrl + 'css/' + linkItem + '?v=' + pageVersion + '" />');
                    });
                    cssHref = '' + linkContent;
                }

                if (scripts) {
                    var scriptContent = [];
                    _lodash2.default.each(scripts, function (scriptItem, scriptKey) {
                        scriptContent.push('<script type="text/javascript" src="' + webresourceBaseUrl + 'js/' + scriptItem + '?v=' + pageVersion + '"></script>');
                    });
                    scriptHref = '' + scriptContent;
                }
            }
        });

        _lodash2.default.each(_controller2.default.entrys, function (item, index) {
            if (actionPrefix.toLowerCase() == item && item != 'react') {
                actionPrefixFlag = true;
                return false;
            }
        });

        if (actionPrefix == 'entry') {
            cssHref = '\n                ' + cssHref + '\n                <style>\n                     html{\n                          font-size: 100px;\n                          font-size: 26.67vw;\n                     }\n                </style>\n            ';
        } else if (actionPrefix == 'research') {
            cssHref = '\n                ' + cssHref + '\n                <link rel="stylesheet" href="' + aresPrefix + '/css/bootstrap.min.css?v=' + pageVersion + '" />\n            ';
        } else if (actionPrefixFlag) {
            bundleHref = actionPrefix;
        }
    }

    var the3rdScript = '\n        <script type="text/javascript" src="' + aresPrefix + '/js/vendor.453dc92ef6a2d33a9de0.js?v=' + pageVersion + '"></script>\n    ';
    var bundleScripts = [];

    if (isDevelopment != 1) {
        if (isRelease || queryRelease) {
            the3rdScript = '\n                <script type="text/javascript" src="' + aresPrefix + '/js/react.production.min.js?v=' + pageVersion + '"></script>\n                <script type="text/javascript" src="' + aresPrefix + '/js/react-dom.production.min.js?v=' + pageVersion + '"></script>\n                <script type="text/javascript" src="' + aresPrefix + '/js/vendor.a12694cb16fe497c7e63.js?v=' + pageVersion + '"></script>\n            ';

            if (_bundleConfig2.default) {
                if (actionPrefixFlag) {
                    _lodash2.default.each(_bundleConfig2.default[actionPrefix], function (item, index) {
                        bundleScripts.push('\n                            <script src="' + aresPrefix + '/page/' + item + '/bundle.js?v=' + pageVersion + '" type="text/javascript"></script>\n                        ');
                    });
                } else {
                    _lodash2.default.each(_bundleConfig2.default['react'], function (item, index) {
                        bundleScripts.push('\n                            <script src="' + aresPrefix + '/page/' + item + '/bundle.js?v=' + pageVersion + '" type="text/javascript"></script>\n                        ');
                    });
                }
            }
        }
    }

    var html = '<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>' + title + '</title>\n    <link rel="dns-prefetch" href="//www.github.com">\n    <meta name="keywords" content=' + keywords + ' />\n    <meta name="description" content=' + description + ' />\n    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui" />\n    <link rel="stylesheet" href="' + aresPrefix + '/page/' + bundleHref + '/index.css?v=' + pageVersion + '" />\n    <meta name="appBaseUrl" content="' + aresPrefix + '/" />\n    <meta name="format-detection" content="telephone=no"/>\n    <meta name="webresourceBaseUrl" content=' + webresourceBaseUrl + ' />\n    <meta name="restfullApi" content=' + restfullApi + ' />\n    <meta name="restfullApiHttps" content=' + restfullApiHttps + ' />\n\n    <!-- uc\u5F3A\u5236\u7AD6\u5C4F -->\n    <meta name="screen-orientation" content="portrait" />\n    <!-- QQ\u5F3A\u5236\u7AD6\u5C4F -->\n    <meta name="x5-orientation" content="portrait" />\n    <!-- SEO -->\n    <meta name="applicable-device" content="mobile" />\n    <meta name="apple-mobile-web-app-capable" content="yes" />\n    <meta http-equiv="Cache-Control" content="no-siteapp" />\n    \n    ' + cssHref + '\n    \n    <script type="text/javascript">\n        window.ssr = \'' + ssr + '\';\n        window.isStatic = \'' + isStatic + '\';\n        window.wrapperDic = \'' + wrapperDic + '\';\n    </script>\n</head>\n\n<body onselectstart="return false" style="overflow-y: auto">\n    <div id="headerview" style="display: none;">\n        <header id="main_header" class="common_header"></header>\n    </div>\n\n    <div id="main">\n        <div class="main-frame">\n            <div class="main-viewport">\n                    <div id="app"><div>' + component + '</div></div>\n            </div>\n            <div class="main-state"></div>\n        </div>\n    </div>\n    <div id="footer"></div>\n    \n    <script>\n          // \u8B66\u544A\uFF1A\u5173\u4E8E\u5728 HTML \u4E2D\u5D4C\u5165 JSON \u7684\u5B89\u5168\u95EE\u9898\uFF0C\u8BF7\u67E5\u770B\u4EE5\u4E0B\u6587\u6863\n          // http://redux.js.org/recipes/ServerRendering.html#security-considerations\n          window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\u003c') + ';\n    </script>\n    \n    ' + scriptHref + '\n\n    ' + the3rdScript + '\n    \n    <script src="' + aresPrefix + '/js/commonUtil.js?v=' + pageVersion + '" pd_init="1"></script>\n    \n    ' + bundleScripts.join('') + '\n    \n    <script src="' + aresPrefix + '/page/' + bundleHref + '/bundle.js?v=' + pageVersion + '" type="text/javascript"></script>\n</body>\n</html>\n    ';

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
        var component = _server2.default.renderToString(_react2.default.createElement(item.component, null));
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
                res.end(self.renderFullPage(_extends({
                    preloadedState: preloadedState
                }, commonObj)));
            } else {
                apiFunc(_fetch2.default, req, res).then(function (preloadedState) {
                    res.end(self.renderFullPage(_extends({
                        preloadedState: preloadedState
                    }, commonObj)));
                }).catch(function (err) {
                    console.log('apiFunc_err', err);
                    res.end(self.renderFullPage(_extends({}, commonObj)));
                });
            }
        } else {
            return callback && callback();
        }
    } else {
        return callback && callback();
    }
};

exports.default = obj;