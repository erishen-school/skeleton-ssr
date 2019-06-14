'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _H1SkeletonComponent = require('../../common/H1SkeletonComponent');

var _H1SkeletonComponent2 = _interopRequireDefault(_H1SkeletonComponent);

var _BasePageComponent2 = require('../../common/BasePageComponent');

var _BasePageComponent3 = _interopRequireDefault(_BasePageComponent2);

var _util = require('../../../helper/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lei_sun on 2019/6/6.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ApiopenVideoRecommend = function (_BasePageComponent) {
    _inherits(ApiopenVideoRecommend, _BasePageComponent);

    function ApiopenVideoRecommend(props) {
        _classCallCheck(this, ApiopenVideoRecommend);

        var _this = _possibleConstructorReturn(this, (ApiopenVideoRecommend.__proto__ || Object.getPrototypeOf(ApiopenVideoRecommend)).call(this, props));

        _this.setRedux(_reducers2.default, actions);
        return _this;
    }

    _createClass(ApiopenVideoRecommend, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.unsubscribe = this.store.subscribe(function () {
                _this2.setState(_this2.store.getState());
            });

            if (!this.preloadedState || window.isStatic == 'true') {}
        }
    }, {
        key: 'render',
        value: function render() {
            var videoRecommend = this.state.videoRecommend;
            var recommendObj = videoRecommend.recommendObj,
                loadingStatus = videoRecommend.loadingStatus;

            console.log('recommendObj', recommendObj, loadingStatus);

            return _react2.default.createElement(
                'div',
                { className: 'apiopen-videoRecommend' },
                _react2.default.createElement(_H1SkeletonComponent2.default, { item: recommendObj.length, loadingStatus: loadingStatus })
            );
        }
    }]);

    return ApiopenVideoRecommend;
}(_BasePageComponent3.default);

exports.default = ApiopenVideoRecommend;