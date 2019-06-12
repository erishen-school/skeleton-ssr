/**
 * Created by lei_sun on 2019/6/12.
 */
import './index.less';
import Common from '../common';

const Config = require('../../config/math.js').default.getConfig(window.wrapperDic);
Common.setFrontRoute(Config);