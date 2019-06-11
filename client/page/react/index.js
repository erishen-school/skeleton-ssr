/**
 * Created by lei_sun on 2018/2/11.
 */
import './index.less';
import Common from '../common';

const Config = require('../../config/index.js').default.getConfig(window.wrapperDic);
Common.setFrontRoute(Config);