'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _render = require('./util/render');

var _render2 = _interopRequireDefault(_render);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapperDic = process.env.WRAPPER; /**
                                       * Created by lei_sun on 2018/5/31.
                                       */

var Config = require('../../client/config/static').default.getConfig(wrapperDic);

var router = _express2.default.Router();

router.use(function timeLog(req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log((0, _moment2.default)().format('YYYY-MM-DD HH:mm:ss') + ' ' + fullUrl);
    next();
});

var handleConfig = function handleConfig(item, action) {
    if (action == undefined) action = '';

    if (item) {
        var ssr = item.ssr == undefined ? true : item.ssr;

        if (ssr) {
            router.get('/' + action, function (req, res) {
                _render2.default.handleSSR(item, action, req, res);
            });
        }
    }
};

var index = 0;
_lodash2.default.each(Config, function (item, key) {
    //console.log(item, key, index);
    if (index == 0) {
        handleConfig(item);
    }

    handleConfig(item, item.action);
    index++;
});

exports.default = router;