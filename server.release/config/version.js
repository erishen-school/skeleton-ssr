"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.staticVersion = void 0;
var isRelease = process.env.RELEASE;
var releaseDate = process.env.RELEASEDATE;
var today = new Date();
var version = today.getTime();

if (isRelease) {
  version = releaseDate;
}

var getRandomNum = function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var staticVersion = function staticVersion() {
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var date = today.getDate();
  if (month < 10) month = '0' + month;
  if (date < 10) date = '0' + date;
  var version = year + month + date + '_';
  if (isRelease) version += releaseDate;else version += getRandomNum(0, 1000);
  return version;
};

exports.staticVersion = staticVersion;
var _default = version;
exports["default"] = _default;