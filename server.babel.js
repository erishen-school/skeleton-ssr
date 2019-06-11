/**
 * Created by lei_sun on 2018/3/8.
 */
require('babel-register');
require("babel-polyfill");
process.env.DEVELOPMENT = 0; // 默认 0
process.env.WRAPPER = 'wrapper';
require('./server');