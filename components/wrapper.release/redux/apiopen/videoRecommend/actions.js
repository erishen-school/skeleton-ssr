'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getApiopenVideoRecommend = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by lei_sun on 2019/6/6.
                                                                                                                                                                                                                                                                   */


var _apiopenService = require('../../../services/apiopenService');

var _apiopenService2 = _interopRequireDefault(_apiopenService);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getApiopenVideoRecommend = exports.getApiopenVideoRecommend = function getApiopenVideoRecommend(obj) {
    return function (dispatch) {
        dispatch({
            type: _constants.GET_APIOPEN_VIDEO_RECOMMEND
        });

        _apiopenService2.default.getApiopenVideoRecommend(obj).then(function (response) {
            var params = {
                recommendObj: null
            };

            if (response) {
                params.recommendObj = response.result;
            }

            dispatch(_extends({
                type: _constants.GET_APIOPEN_VIDEO_RECOMMEND_SUCCEEDED
            }, params));
        }).catch(function (e) {
            dispatch({
                type: _constants.GET_APIOPEN_VIDEO_RECOMMEND_FAILED,
                message: e.message
            });
        });
    };
};