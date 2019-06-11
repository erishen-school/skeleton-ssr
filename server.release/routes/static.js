'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by lei_sun on 2017/12/1.
                                                                                                                                                                                                                                                                   */


var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _util = require('../helper/util');

var _util2 = _interopRequireDefault(_util);

var _render = require('./util/render');

var _render2 = _interopRequireDefault(_render);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _fetch = require('../service/fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _project = require('../config/project');

var _project2 = _interopRequireDefault(_project);

var _version = require('../config/version');

var _version2 = _interopRequireDefault(_version);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var isRelease = process.env.RELEASE;
var wrapperDic = process.env.WRAPPER;
var Config = require('../../client/config/static').default.getConfig(wrapperDic, { isHybrid: true });

var firstUpper = function firstUpper(str) {
    return _util2.default.firstUpperCase(str);
};

var getHtml = function getHtml() {
    return '<!DOCTYPE html>\n<html>\n    <head>\n        <meta charset="UTF-8">\n    </head>\n    <body>\n        hello\n    </body>\n</html>';
};

var renderWrite = function renderWrite(req, res, route, callback) {
    var item = Config[route];
    var html = getHtml();
    var queryRelease = req.query.release;
    var originalUrl = req.originalUrl;

    if (item) {
        var action = item.action;
        console.log('action', action);
        var component = _server2.default.renderToString(_react2.default.createElement(item.component, null));
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
                html = _render2.default.renderFullPage(_extends({
                    preloadedState: preloadedState
                }, commonObj));
                renderReactHome(req, res, action, html, callback);
            } else {
                apiFunc(_fetch2.default, req, res).then(function (preloadedState) {
                    html = _render2.default.renderFullPage(_extends({
                        preloadedState: preloadedState
                    }, commonObj));
                    renderReactHome(req, res, action, html, callback);
                }).catch(function (err) {
                    console.log('apiFunc_err', err);
                    html = _render2.default.renderFullPage(_extends({}, commonObj));
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
    res.render('React/Home.html', { html: html }, function (err, resHTML) {
        if (!err) {
            var filename = route;
            if (filename != '') {
                console.log('filename', filename);
                var filePathPrefix = _path2.default.join(__dirname, '../../public') + _project2.default.hybridDictionary + '/';

                if (!_fs2.default.existsSync(filePathPrefix)) _fs2.default.mkdirSync(filePathPrefix);

                if (filename.indexOf('/') != -1) {
                    var filenameArr = filename.split('/');
                    var filenameArrLen = filenameArr.length;
                    var dir = filePathPrefix;

                    if (filenameArrLen == 2) {
                        dir += filenameArr[0];
                    } else if (filenameArrLen == 3) {
                        dir += filenameArr[0] + '/' + filenameArr[1];

                        if (!_fs2.default.existsSync(filenameArr[0])) _fs2.default.mkdirSync(filenameArr[0]);
                    } else if (filenameArrLen == 4) {
                        dir += filenameArr[0] + '/' + filenameArr[1] + '/' + filenameArr[2];

                        if (!_fs2.default.existsSync(filenameArr[0])) _fs2.default.mkdirSync(filenameArr[0]);

                        if (!_fs2.default.existsSync(filenameArr[1])) _fs2.default.mkdirSync(filenameArr[1]);
                    }

                    if (!_fs2.default.existsSync(dir)) _fs2.default.mkdirSync(dir);
                }

                _fs2.default.writeFile(filePathPrefix + filename + '.html', resHTML, 'utf8', function (err) {
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
                resultArray.push({ route: route, flag: flag });
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
    obj.version = 'static: ' + _version2.default;
    _fetch2.default.showJSON(res, obj);
});

exports.default = router;