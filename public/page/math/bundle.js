!function(e){function t(t){for(var n,o,c=t[0],f=t[1],a=t[2],p=0,s=[];p<c.length;p++)o=c[p],Object.prototype.hasOwnProperty.call(u,o)&&u[o]&&s.push(u[o][0]),u[o]=0;for(n in f)Object.prototype.hasOwnProperty.call(f,n)&&(e[n]=f[n]);for(l&&l(t);s.length;)s.shift()();return i.push.apply(i,a||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],o=!0,c=1;c<r.length;c++){var f=r[c];0!==u[f]&&(o=!1)}o&&(i.splice(t--,1),e=n(n.s=r[0]))}return e}function n(t){if(o[t])return o[t].exports;var r=o[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,n),r.l=!0,r.exports}var o={},u={4:0},i=[];n.m=e,n.c=o,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/";var c=window.webpackJsonp=window.webpackJsonp||[],f=c.push.bind(c);c.push=t,c=c.slice();for(var a=0;a<c.length;a++)t(c[a]);var l=f;i.push([421,0,1]),r()}({1:function(e,t){e.exports=React},13:function(e,t){e.exports=vendor_a12694cb16fe497c7e63},421:function(e,t,r){r(96),e.exports=r(422)},422:function(e,t,r){"use strict";r.r(t);var n=(r(423),r(47)),o=r(424).default.getConfig(window.wrapperDic);n.a.setFrontRoute(o)},423:function(e,t){},424:function(e,t,r){"use strict";function n(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?Object(arguments[t]):{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){o(e,t,r[t])}))}return e}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.r(t);var u={getConfig:function(e,t){null==t&&(t={});var o=[];-1!=e.indexOf(".")?(o=e.split("."),e="."+o[1]):e="",e="wrapper"+e;var u={};return u.mathQuiz={action:"math/quiz",component:r(82)("./"+e+"/redux/math/quiz/index").default},n({},u)}};t.default=u},50:function(e,t){e.exports=ReactDOM}});