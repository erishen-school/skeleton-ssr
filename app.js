/**
 * Created by lei_sun on 2018/2/13.
 */
process.env.NODE_ENV = 'production';
process.env.RELEASE = true;
process.env.RELEASEDATE = 20181226;
process.env.DEVELOPMENT = 1; // 默认 0
process.env.WRAPPER = 'wrapper.release';
require('babel-register');
require("babel-polyfill");
require('./server.release');