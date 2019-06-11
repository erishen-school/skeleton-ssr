(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{0:function(e,t,n){e.exports=n(16)(1)},100:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(70);t.default=r},101:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(167);t.default=r},102:function(e,t,n){"use strict";var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=n(103);n(122);var r={checkStatus:function(e){if(200<=e.status&&e.status<300)return e;var t=new Error(e.statusText);throw t.response=e,t},parseJSON:function(e){return e.json()},nodePromise:function(n,r){var o=this;return new Promise(function(e,t){o.nodeModel(n,r,e,t)})},nodeModel:function(e,t,n,r){var o=i.getLocationPrefix()+"/api/"+e;return this.ajaxNodePost(o,t,n,r)},ajaxNodePost:function(e,t,n,r,o){t.contentType="json","undefined"!=typeof window&&fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(t)}).then(this.checkStatus).then(this.parseJSON).then(function(e){return n&&n(e)}).catch(function(e){return r&&r(e)})},ajaxDirectPost:function(e,t,n,r){t.contentType="json","undefined"!=typeof window&&fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(this.checkStatus).then(this.parseJSON).then(function(e){return n&&n(e)}).catch(function(e){return r&&r(e)})},ajaxDirectPostPromise:function(n,r){var o=this;return new Promise(function(e,t){o.ajaxDirectPost(n,r,e,t)})},ajaxDirectGet:function(e,t,n,r){t.contentType="json","undefined"!=typeof window&&fetch(e,o({},t)).then(this.checkStatus).then(this.parseJSON).then(function(e){return n&&n(e)}).catch(function(e){return r&&r(e)})},ajaxDirectGetPromise:function(n,r){var o=this;return new Promise(function(e,t){o.ajaxDirectGet(n,r,e,t)})}};e.exports=r},103:function(e,t,n){"use strict";var a=n(39),r=(n(70),n(98).default),i=n(122),u=n(102),c=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","!","@","#","$","%","^","&","*","(",")","-","+","=","?","/"],o={ajaxPost:function(e,t,n,r,o){t.head={},t.contentType="json",t=JSON.stringify(t),"undefined"!=typeof window&&i(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(u.checkStatus).then(u.parseJSON).then(function(e){return n&&n(e)}).catch(function(e){return r&&r(e)})},getGeoLocation:function(t){var n=121.48,r=31.22;if(!window.navigator.geolocation)return t&&t({longitude:n,latitude:r});window.navigator.geolocation.getCurrentPosition(function(e){return n=e.coords.longitude,r=e.coords.latitude,t&&t({longitude:n,latitude:r})},function(e){return t&&t({longitude:n,latitude:r})},{timeout:1e4})},getUrlObj:function(e){var r={},t=e.indexOf("?");if(-1!=t&&(e=e.substring(t+1)),e){var n=e.split("&");a.each(n,function(e,t){var n=e.split("=");n&&(2<=n.length?r[n[0]]=n[1]:1==n.length&&"R"==n[0]&&(r[n[0]]=0))})}return r},getRandomNum:function(e,t){return Math.floor(Math.random()*(t-e+1)+e)},decodeMyStr:function(e){for(var t=e.split(""),n=t.length,r=c.length,o=[],i=0;i<n;i++){for(var a=!1,u=0;u<r;u++)if(t[i].toString()==c[u].toString()){o.push(c[r-1-u].toString()),a=!0;break}a||o.push(" ")}return o.join("")},encodeMyStr:function(e){for(var t=e.split(""),n=t.length,r=c.length,o=[],i=0;i<n;i++){for(var a=!1,u=0;u<r;u++)if(t[i].toString()==c[u].toString()){o.push(c[r-1-u]),a=!0;break}a||o.push(" ")}return o.join("")},appendScript:function(e){var t=document.createElement("script");t.type="text/javascript",t.src=e,"undefined"!=typeof window&&document.body.append(t)},trim:function(e){return e.replace(/^\s*|\s*$/g,"")},changeCurrency:function(e){return"CNY"==e&&(e="￥"),e},jumpRedirect:function(e){window.location.reload()},jumpUrlDirect:function(e){window.location.href=e},getLocationPrefix:function(){if("undefined"==typeof window)return"";var o=r.serverPrefix,e=r.serverUrls,i=window.location.href;return a.each(e,function(e,t){var n=e.url,r=o.replace("*",n);if(""!=i&&-1!=i.indexOf(r))return i=i.split(r)[0]+r,!0}),i},getUrlPrefix:function(){if("undefined"==typeof window)return"";var o=r.serverPrefix,e=r.serverUrls,i=window.location.href;return a.each(e,function(e,t){var n=e.url,r=o.replace("*",n);if(""!=i&&-1!=i.indexOf(r))return i=r.substring(1),!0}),i},addKeyFrames:function(e){if(null==e&&(e=100),"undefined"!=typeof document){var t=document.createElement("style");t.type="text/css",t.innerHTML="            @-webkit-keyframes wordsLoop {                0% {                    -webkit-transform: translateX(200px);                    transform: translateX(200px);                }                100% {                    -webkit-transform: translateX(-A_DYNAMIC_VALUE%);                    transform: translateX(-A_DYNAMIC_VALUE%);                }            }            @keyframes wordsLoop {                0% {                    -webkit-transform: translateX(200px);                    transform: translateX(200px);                }                100% {                    -webkit-transform: translateX(-A_DYNAMIC_VALUE%);                    transform: translateX(-A_DYNAMIC_VALUE%);                }            }".replace(/A_DYNAMIC_VALUE/g,e),document.getElementsByTagName("head")[0].appendChild(t)}},setBodyOverflow:function(e){"undefined"!=typeof document&&(document.getElementsByTagName("body")[0].style["overflow-y"]=e?"auto":"hidden")},goBack:function(){"undefined"!=typeof window&&window.history.back()},_documentTitle:function(e){"undefined"!=typeof window&&(document.title=e)},dynamicLoadJweixin:function(e){if("undefined"!=typeof wx)return e&&e();this.dynamicLoadScript(this.getLocationPrefix()+"/webresource/js/jweixin-1.3.2.js",e)},dynamicLoadJquery:function(e){if("undefined"!=typeof jquery)return e&&e();this.dynamicLoadScript(this.getLocationPrefix()+"/webresource/js/jquery-3.3.1.js",e)},dynamicLoadScript:function(e,t){if("undefined"!=typeof window){var n=document.getElementsByTagName("head")[0],r=document.createElement("script");r.type="text/javascript",r.charset="utf-8",r.src=e,r.onload=function(){return t&&t()},r.onerror=function(){},n.appendChild(r)}},dynamicLoadCss:function(e,t){if("undefined"!=typeof window){var n=document.getElementsByTagName("head")[0],r=document.createElement("link");r.type="text/css",r.rel="stylesheet",r.href=e,r.onload=function(){return t&&t()},n.appendChild(r)}},scrollAction:function(e,t,n){if(null==t&&(t=10),"undefined"!=typeof window){var r=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};this.dynamicLoadJquery(function(){$(window).off("scroll."+e).on("scroll."+e,function(){r(function(){if($(window).height()+$(window).scrollTop()-$("."+e).height()>=t)return n&&n()})})})}}};e.exports=o},104:function(e,t,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var o,i=function(e,t,n){return t&&l(e.prototype,t),n&&l(e,n),e},a=n(1),u=(o=a)&&o.__esModule?o:{default:o},c=(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":r(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(s,a.Component),i(s,[{key:"componentWillMount",value:function(){window.location.href="https://erishen.github.io"}},{key:"render",value:function(){return u.default.createElement("label",null,"")}}]),s);function s(){return function(e){if(!(e instanceof s))throw new TypeError("Cannot call a class as a function")}(this),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==(void 0===t?"undefined":r(t))&&"function"!=typeof t?e:t}(this,(s.__proto__||Object.getPrototypeOf(s)).apply(this,arguments))}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}t.default=c},121:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=r(n(1)),o=r(n(9)),c=n(166),s=r(n(39)),l=r(n(98)),d=l.default.serverPrefix,f=l.default.serverUrls,p=window.location.href,i=window.wrapperDic,m=n(99)("./"+i+"/redux/common/NoMatchComponent.js").default,a={setFrontRoute:function(e){if(null!=document.getElementById("app")){var r="";s.default.each(f,function(e,t){var n=e.url;if(-1!=p.indexOf("/"+n+"/"))return r=d.replace("*",n),!0}),""==r&&(r=d.replace("*","webapp")),"true"==window.isStatic&&(r+=l.default.hybridDictionary);var i=[],a=0;s.default.each(e,function(e,t){var n=e.action,r=e.component,o="/"+n;"true"==window.isStatic&&(o+=".html"),0==a&&i.push(u.default.createElement(c.Route,{key:t+a,exact:!0,path:"/",component:r})),i.push(u.default.createElement(c.Route,{key:t+a,path:o,component:r})),a++});var t=u.default.createElement(c.BrowserRouter,{basename:r},u.default.createElement(c.Switch,null,i,u.default.createElement(c.Route,{component:m})));o.default.render(t,document.getElementById("app"))}}};t.default=a},124:function(e,t,n){"use strict";var r=n(55),o=n(168).default,i=n(169).default,a=n(70),u=r.createStore,c=r.applyMiddleware,s=r.bindActionCreators,l=i(),d=[o];a.useSaga&&d.push(l);var f=c.apply(void 0,d)(u);e.exports={createStoreWithMiddleware:f,sagaMiddleware:l,createAction:function(e,t){return s(e,t)}}},138:function(e,t,n){e.exports=n(16)(36)},166:function(e,t,n){e.exports=n(16)(99)},167:function(e,t,n){"use strict";var r={},l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.base64Encode=function(e){var t,n,r,o,i,a,u,c="",s=0;for(e=d(e);s<e.length;)o=(t=e.charCodeAt(s++))>>2,i=(3&t)<<4|(n=e.charCodeAt(s++))>>4,a=(15&n)<<2|(r=e.charCodeAt(s++))>>6,u=63&r,isNaN(n)?a=u=64:isNaN(r)&&(u=64),c=c+l.charAt(o)+l.charAt(i)+l.charAt(a)+l.charAt(u);return c},r.base64Decode=function(e){var t,n,r,o,i,a,u="",c=0;for(e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");c<e.length;)t=l.indexOf(e.charAt(c++))<<2|(o=l.indexOf(e.charAt(c++)))>>4,n=(15&o)<<4|(i=l.indexOf(e.charAt(c++)))>>2,r=(3&i)<<6|(a=l.indexOf(e.charAt(c++))),u+=String.fromCharCode(t),64!=i&&(u+=String.fromCharCode(n)),64!=a&&(u+=String.fromCharCode(r));return s(u)};var d=function(e){e=e.replace(/\r\n/g,"\n");for(var t="",n=0;n<e.length;n++){var r=e.charCodeAt(n);r<128?t+=String.fromCharCode(r):(127<r&&r<2048?t+=String.fromCharCode(r>>6|192):(t+=String.fromCharCode(r>>12|224),t+=String.fromCharCode(r>>6&63|128)),t+=String.fromCharCode(63&r|128))}return t},s=function(e){for(var t="",n=0,r=0,o=0,i=0;n<e.length;)(r=e.charCodeAt(n))<128?(t+=String.fromCharCode(r),n++):191<r&&r<224?(o=e.charCodeAt(n+1),t+=String.fromCharCode((31&r)<<6|63&o),n+=2):(o=e.charCodeAt(n+1),i=e.charCodeAt(n+2),t+=String.fromCharCode((15&r)<<12|(63&o)<<6|63&i),n+=3);return t};e.exports=r},168:function(e,t,n){e.exports=n(16)(101)},169:function(e,t,n){e.exports=n(16)(102)},39:function(e,t,n){e.exports=n(16)(103)},44:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(102);t.default=r},45:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var i=function(e,t,n){return t&&p(e.prototype,t),n&&p(e,n),e},a=r(n(1)),u=r(n(72)),c=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(73)),s=r(n(47)),l=r(n(48)),d=(r(n(71)),function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":o(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(f,l.default),i(f,[{key:"componentDidMount",value:function(){var e=this;this.unsubscribe=this.store.subscribe(function(){e.setState(e.store.getState())}),this.preloadedState&&"true"!=window.isStatic||this.action.getApiopenVideoRecommend(127398)}},{key:"render",value:function(){var e=this.state.videoRecommend,t=e.recommendObj,n=e.loadingStatus;return a.default.createElement("div",{className:"apiopen-videoRecommend"},a.default.createElement(s.default,{item:t.length,loadingStatus:n}))}}]),f);function f(e){!function(e){if(!(e instanceof f))throw new TypeError("Cannot call a class as a function")}(this);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==(void 0===t?"undefined":o(t))&&"function"!=typeof t?e:t}(this,(f.__proto__||Object.getPrototypeOf(f)).call(this,e));return t.setRedux(u.default,c),t}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}t.default=d},46:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.GET_APIOPEN_VIDEO_RECOMMEND="GET_APIOPEN_VIDEO_RECOMMEND",t.GET_APIOPEN_VIDEO_RECOMMEND_SUCCEEDED="GET_APIOPEN_VIDEO_RECOMMEND_SUCCEEDED",t.GET_APIOPEN_VIDEO_RECOMMEND_FAILED="GET_APIOPEN_VIDEO_RECOMMEND_FAILED"},47:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=(r=n(1))&&r.__esModule?r:{default:r},i=n(123),a=(0,i.createSkeletonElement)("h1"),u=(0,i.createSkeletonProvider)({item:"_______"},function(e){var t=e.loadingStatus;return"loading"===t||void 0===t},function(){return{color:"#f2f2f2",backgroundColor:"#f2f2f2"}})(function(e){var t=e.item;return o.default.createElement("div",null,o.default.createElement(a,null,t))});t.default=u},48:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var i=function(e,t,n){return t&&l(e.prototype,t),n&&l(e,n),e},a=n(1),u=r((r(a),n(75))),c=(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":o(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(s,a.Component),i(s,[{key:"setRedux",value:function(e,t,n){this.store=u.default.createStoreWithMiddleware(e,this.preloadedState),this.state=this.store.getState(),null!=n&&(t=n,u.default.sagaMiddleware.run(n.mySaga)),this.action=u.default.createAction(t,this.store.dispatch)}},{key:"componentWillUnmount",value:function(){this.unsubscribe&&this.unsubscribe()}}]),s);function s(e){!function(e){if(!(e instanceof s))throw new TypeError("Cannot call a class as a function")}(this);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==(void 0===t?"undefined":o(t))&&"function"!=typeof t?e:t}(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,e));return t.preloadedState=void 0,"undefined"!=typeof window&&(t.preloadedState=window.__PRELOADED_STATE__),t}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}t.default=c},49:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var i=function(e,t,n){return t&&f(e.prototype,t),n&&f(e,n),e},a=r(n(1)),u=r(n(76)),c=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(77)),s=r(n(47)),l=(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":o(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(d,r(n(48)).default),i(d,[{key:"componentDidMount",value:function(){var e=this;this.unsubscribe=this.store.subscribe(function(){e.setState(e.store.getState())}),this.preloadedState&&"true"!=window.isStatic||this.action.getGithubZeitNext()}},{key:"render",value:function(){var e=this.state.zeit,t=e.nextObj,n=e.loadingStatus;return a.default.createElement("div",{className:"github-zeit"},a.default.createElement(s.default,{item:t.full_name,loadingStatus:n}),a.default.createElement(s.default,{item:t.archive_url,loadingStatus:n}),a.default.createElement(s.default,{item:t.assignees_url,loadingStatus:n}),a.default.createElement(s.default,{item:t.blobs_url,loadingStatus:n}),a.default.createElement(s.default,{item:t.branches_url,loadingStatus:n}),a.default.createElement(s.default,{item:t.clone_url,loadingStatus:n}))}}]),d);function d(e){!function(e){if(!(e instanceof d))throw new TypeError("Cannot call a class as a function")}(this);var t=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==(void 0===t?"undefined":o(t))&&"function"!=typeof t?e:t}(this,(d.__proto__||Object.getPrototypeOf(d)).call(this,e));return t.setRedux(u.default,c),t}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}t.default=l},50:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.GET_GITHUB_ZEIT_NEXT="GET_GITHUB_ZEIT_NEXT",t.GET_GITHUB_ZEIT_NEXT_SUCCEEDED="GET_GITHUB_ZEIT_NEXT_SUCCEEDED",t.GET_GITHUB_ZEIT_NEXT_FAILED="GET_GITHUB_ZEIT_NEXT_FAILED"},55:function(e,t,n){e.exports=n(16)(38)},70:function(e,t,n){"use strict";e.exports={development:!0,useSaga:!0}},71:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(103);t.default=r},72:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(55),i=(r=n(39))&&r.__esModule?r:{default:r},a=n(46),u={recommendObj:{},loadingStatus:"loading"},c=(0,o.combineReducers)({videoRecommend:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:u,t=arguments[1],n=i.default.cloneDeep(e);switch(t.type){case a.GET_APIOPEN_VIDEO_RECOMMEND_SUCCEEDED:return n.recommendObj=t.recommendObj,n.loadingStatus="done",n;default:return e}}});t.default=c},73:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getApiopenVideoRecommend=void 0;var r,o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=(r=n(74))&&r.__esModule?r:{default:r},a=n(46);t.getApiopenVideoRecommend=function(e){return function(n){n({type:a.GET_APIOPEN_VIDEO_RECOMMEND}),i.default.getApiopenVideoRecommend(e).then(function(e){var t={recommendObj:null};e&&(t.recommendObj=e.result),n(o({type:a.GET_APIOPEN_VIDEO_RECOMMEND_SUCCEEDED},t))}).catch(function(e){n({type:a.GET_APIOPEN_VIDEO_RECOMMEND_FAILED,message:e.message})})}}},74:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=(r=n(44))&&r.__esModule?r:{default:r},i={getApiopenVideoRecommend:function(n){return new Promise(function(e,t){"true"!==window.isStatic&&o.default.ajaxDirectGetPromise("https://api.apiopen.top/videoRecommend?id="+n,{}).then(e).catch(t)})}};t.default=i},75:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(124);t.default=r},76:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(55),i=(r=n(39))&&r.__esModule?r:{default:r},a=n(50),u={nextObj:{},loadingStatus:"loading"},c=(0,o.combineReducers)({zeit:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:u,t=arguments[1],n=i.default.cloneDeep(e);switch(t.type){case a.GET_GITHUB_ZEIT_NEXT_SUCCEEDED:return n.nextObj=t.nextObj,n.loadingStatus="done",n;default:return e}}});t.default=c},77:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getGithubZeitNext=void 0;var r,o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=(r=n(78))&&r.__esModule?r:{default:r},a=n(50);t.getGithubZeitNext=function(e){return function(n){n({type:a.GET_GITHUB_ZEIT_NEXT}),i.default.getGithubZeitNext(e).then(function(e){var t={nextObj:null};e&&(t.nextObj=e),n(o({type:a.GET_GITHUB_ZEIT_NEXT_SUCCEEDED},t))}).catch(function(e){n({type:a.GET_GITHUB_ZEIT_NEXT_FAILED,message:e.message})})}}},78:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=(r=n(44))&&r.__esModule?r:{default:r},i={getGithubZeitNext:function(){return new Promise(function(e,t){"true"!==window.isStatic&&o.default.ajaxDirectGetPromise("https://api.github.com/repos/zeit/next.js",{}).then(e).catch(t)})}};t.default=i},98:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={serverPrefix:"/*/skeleton",aresPrefix:{uat:"",pro:""},serverUrls:[{url:"html5",ssr:!0},{url:"webapp",ssr:!1}],hybridDictionary:"/hybrid",ssrParameter:"isseo=1"}},99:function(e,t,n){function r(e){var t=o(e);return n(t)}function o(e){if(n.o(i,e))return i[e];var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}var i={"./wrapper.release/helper/config":100,"./wrapper.release/helper/config.js":100,"./wrapper.release/helper/encypter":101,"./wrapper.release/helper/encypter.js":101,"./wrapper.release/helper/fetch":44,"./wrapper.release/helper/fetch.js":44,"./wrapper.release/helper/util":71,"./wrapper.release/helper/util.js":71,"./wrapper.release/redux/apiopen/videoRecommend":45,"./wrapper.release/redux/apiopen/videoRecommend/":45,"./wrapper.release/redux/apiopen/videoRecommend/actions":73,"./wrapper.release/redux/apiopen/videoRecommend/actions.js":73,"./wrapper.release/redux/apiopen/videoRecommend/constants":46,"./wrapper.release/redux/apiopen/videoRecommend/constants.js":46,"./wrapper.release/redux/apiopen/videoRecommend/index":45,"./wrapper.release/redux/apiopen/videoRecommend/index.js":45,"./wrapper.release/redux/apiopen/videoRecommend/reducers":72,"./wrapper.release/redux/apiopen/videoRecommend/reducers.js":72,"./wrapper.release/redux/common/BasePageComponent":48,"./wrapper.release/redux/common/BasePageComponent.js":48,"./wrapper.release/redux/common/H1SkeletonComponent":47,"./wrapper.release/redux/common/H1SkeletonComponent.js":47,"./wrapper.release/redux/common/NoMatchComponent":104,"./wrapper.release/redux/common/NoMatchComponent.js":104,"./wrapper.release/redux/github/zeit":49,"./wrapper.release/redux/github/zeit/":49,"./wrapper.release/redux/github/zeit/actions":77,"./wrapper.release/redux/github/zeit/actions.js":77,"./wrapper.release/redux/github/zeit/constants":50,"./wrapper.release/redux/github/zeit/constants.js":50,"./wrapper.release/redux/github/zeit/index":49,"./wrapper.release/redux/github/zeit/index.js":49,"./wrapper.release/redux/github/zeit/reducers":76,"./wrapper.release/redux/github/zeit/reducers.js":76,"./wrapper.release/redux/store":75,"./wrapper.release/redux/store.js":75,"./wrapper.release/services/apiopenService":74,"./wrapper.release/services/apiopenService.js":74,"./wrapper.release/services/githubService":78,"./wrapper.release/services/githubService.js":78};r.keys=function(){return Object.keys(i)},r.resolve=o,(e.exports=r).id=99}}]);