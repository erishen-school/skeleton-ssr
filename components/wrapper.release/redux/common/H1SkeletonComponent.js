'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSkeletor = require('@trainline/react-skeletor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var H1 = (0, _reactSkeletor.createSkeletonElement)('h1');

var H1Component = function H1Component(_ref) {
    var item = _ref.item;

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            H1,
            null,
            item
        )
    );
};

var H1SkeletonComponent = (0, _reactSkeletor.createSkeletonProvider)({
    item: '_______'
}, function (_ref2) {
    var loadingStatus = _ref2.loadingStatus;
    return loadingStatus === 'loading' || loadingStatus === undefined;
}, function () {
    return {
        color: '#f2f2f2',
        backgroundColor: '#f2f2f2'
    };
})(H1Component);

exports.default = H1SkeletonComponent;