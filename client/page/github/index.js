import './index.less';
import Common from '../common';

const Config = require('../../config/github.js').default.getConfig(window.wrapperDic);
Common.setFrontRoute(Config);