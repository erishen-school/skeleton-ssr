'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fetch = require('../helper/fetch');

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serviceObj = {}; /**
                      * Created by lei_sun on 2019/6/10.
                      */


serviceObj.getApiopenVideoRecommend = function (id) {
    return new Promise(function (resolve, reject) {
        if (window.isStatic !== 'true') {
            _fetch2.default.ajaxDirectGetPromise('https://api.apiopen.top/videoRecommend?id=' + id, {}).then(resolve).catch(reject);
        }
    });
};

exports.default = serviceObj;