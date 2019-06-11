/**
 * Created by lei_sun on 2019/6/10.
 */
import './index.less';
import Common from '../common';

const Config = require('../../config/apiopen.js').default.getConfig(window.wrapperDic);
Common.setFrontRoute(Config);