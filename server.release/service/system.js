"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _os = _interopRequireDefault(require("os"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by lei_sun on 2018/1/4.
 */
var getIPAdress = function getIPAdress() {
  var interfaces = _os["default"].networkInterfaces(); //console.log('interfaces', interfaces);


  for (var devName in interfaces) {
    //console.log('devName', devName);
    if (devName.indexOf('VPN') == -1) {
      var iface = interfaces[devName];

      for (var i = 0; i < iface.length; i++) {
        var alias = iface[i];

        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address;
        }
      }
    }
  }
};

var _default = {
  getIPAdress: getIPAdress
};
exports["default"] = _default;