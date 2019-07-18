/**
 * Created by lei_sun on 2018/2/13.
 */
process.env.NODE_ENV = 'production';
process.env.RELEASE = true;
process.env.RELEASEDATE = 20190617;
process.env.DEVELOPMENT = 0; // 默认 0
process.env.WRAPPER = 'wrapper.release';
require('@babel/register');
require("@babel/polyfill");
require('./server.release');