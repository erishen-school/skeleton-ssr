!function(e){function t(t){for(var r,o,c=t[0],f=t[1],a=t[2],p=0,s=[];p<c.length;p++)o=c[p],u[o]&&s.push(u[o][0]),u[o]=0;for(r in f)Object.prototype.hasOwnProperty.call(f,r)&&(e[r]=f[r]);for(l&&l(t);s.length;)s.shift()();return i.push.apply(i,a||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,c=1;c<n.length;c++){var f=n[c];0!==u[f]&&(o=!1)}o&&(i.splice(t--,1),e=r(r.s=n[0]))}return e}function r(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}var o={},u={3:0},i=[];r.m=e,r.c=o,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var c=window.webpackJsonp=window.webpackJsonp||[],f=c.push.bind(c);c.push=t,c=c.slice();for(var a=0;a<c.length;a++)t(c[a]);var l=f;i.push([544,0,1]),n()}({1:function(e,t){e.exports=React},16:function(e,t){e.exports=vendor_a12694cb16fe497c7e63},544:function(e,t,n){n(113),e.exports=n(545)},545:function(e,t,n){"use strict";n(546);var r=function(e){return e&&e.__esModule?e:{default:e}}(n(104)),o=n(547).default.getConfig(window.wrapperDic);r.default.setFrontRoute(o)},546:function(e,t){},547:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o={getConfig:function(e,t){null==t&&(t={});var o=[];-1!=e.indexOf(".")?(o=e.split("."),e="."+o[1]):e="",e="wrapper"+e;var u={};return u.githubZeit={action:"github/zeit",component:n(91)("./"+e+"/redux/github/zeit/index").default,apiFunc:function(e,t,n){return new Promise(function(r,o){e.getDirect("https://api.github.com/repos/zeit/next.js",{},t,n,!0).then(function(e){r({zeit:{nextObj:e,loadingStatus:"done"}})}).catch(function(e){o(e)})})}},r({},u)}};t.default=o},9:function(e,t){e.exports=ReactDOM}});