"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Created by lei_sun on 2018/2/9.
 */
var _default = {
  serverPrefix: '/*/skeleton',

  /** 服务站点URL前缀 */
  aresPrefix: {
    uat: '',
    pro: ''
  },
  serverUrls: [{
    url: 'html5',
    ssr: true
  }, {
    url: 'webapp',
    ssr: false
  }],
  hybridDictionary: '/hybrid',
  ssrParameter: 'isseo=1'
};
exports["default"] = _default;