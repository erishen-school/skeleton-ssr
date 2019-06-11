'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getGithubZeitNext = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by lei_sun on 2019/6/6.
                                                                                                                                                                                                                                                                   */


var _githubService = require('../../../services/githubService');

var _githubService2 = _interopRequireDefault(_githubService);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getGithubZeitNext = exports.getGithubZeitNext = function getGithubZeitNext(obj) {
    return function (dispatch) {
        dispatch({
            type: _constants.GET_GITHUB_ZEIT_NEXT
        });

        _githubService2.default.getGithubZeitNext(obj).then(function (response) {
            var params = {
                nextObj: null
            };

            if (response) {
                params.nextObj = response;
            }

            dispatch(_extends({
                type: _constants.GET_GITHUB_ZEIT_NEXT_SUCCEEDED
            }, params));
        }).catch(function (e) {
            dispatch({
                type: _constants.GET_GITHUB_ZEIT_NEXT_FAILED,
                message: e.message
            });
        });
    };
};