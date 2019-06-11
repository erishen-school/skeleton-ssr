'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (app) {
    app.use('/', indexRouter());

    _lodash2.default.each(serverUrls, function (item, key) {
        var url = item.url;
        var ssr = item.ssr;

        if (serverPrefix != '') {
            var replaceUrl = serverPrefix.replace('*', url);

            if (ssr) {
                app.use(replaceUrl + '/', _ssr2.default);
            } else {
                app.use(replaceUrl + '/', indexRouter());
            }

            app.use(replaceUrl + '/slbhealthcheck*', _slbhealthcheck2.default);
            app.use(replaceUrl + '/api', _api2.default);
            app.use(replaceUrl + '/static', _static2.default);

            if (ssr) {
                app.use(replaceUrl + '/*', _ssr2.default);
            } else {
                app.use(replaceUrl + '/*', indexRouter());
            }
        }
    });
};

var _project = require('../config/project');

var _project2 = _interopRequireDefault(_project);

var _slbhealthcheck = require('./slbhealthcheck');

var _slbhealthcheck2 = _interopRequireDefault(_slbhealthcheck);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _ssr = require('./ssr');

var _ssr2 = _interopRequireDefault(_ssr);

var _static = require('./static');

var _static2 = _interopRequireDefault(_static);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverPrefix = _project2.default.serverPrefix;
var serverUrls = _project2.default.serverUrls;

var utilGoRouter = function utilGoRouter(controller, params) {
    if (params == undefined) {
        params = {};
    }

    if (controller == 'react') {
        params.react = true;
    }

    return _util2.default.goRoute(controller, params);
};

var indexRouter = function indexRouter() {
    return utilGoRouter('react');
};

;