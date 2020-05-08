"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _ejs = _interopRequireDefault(require("ejs"));

var _http = _interopRequireDefault(require("http"));

var _https = _interopRequireDefault(require("https"));

var _fs = _interopRequireDefault(require("fs"));

var _package = _interopRequireDefault(require("../package.json"));

var _project = _interopRequireDefault(require("./config/project"));

var _index = _interopRequireDefault(require("./routes/index"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var port = _package["default"].config.port;
var devhost = _package["default"].config.devhost;
var serverPrefix = _project["default"].serverPrefix;
var isRelease = process.env.RELEASE;
console.log('isRelease', isRelease, serverPrefix);
var viewsDictionary = './views';
var publicDictionary = '../public';

if (isRelease) {
  viewsDictionary = '../dest/views';
  publicDictionary = '../dest/public';
}

var isDev = process.env.NODE_ENV !== 'production';
var app = (0, _express["default"])();
_ejs["default"].delimiter = '?';
app.engine('html', _ejs["default"].__express);
app.set('view engine', 'html');
app.set('views', _path["default"].resolve(__dirname, viewsDictionary));
app.use(_bodyParser["default"].json()); // for parsing application/json
// local variables for all views

app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = true;

if (isDev) {
  var webpack = require('webpack');

  var webpackDevMiddleware = require('webpack-dev-middleware');

  var webpackHotMiddleware = require('webpack-hot-middleware');

  var webpackDevConfig = require('../webpack.config.js');

  var compiler = webpack(webpackDevConfig);
  var ignored = [/[\\/]\.git[\\/]/, /[\\/]node_modules[\\/]/]; // attach to the compiler & the server

  app.use(serverPrefix, webpackDevMiddleware(compiler, {
    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    },
    logLevel: 'silent',
    watchOptions: {
      ignored: ignored
    } //writeToDisk: true

  }));
  app.use(webpackHotMiddleware(compiler, {
    log: false,
    heartbeat: 2500
  }));
  app.use(serverPrefix, _express["default"]["static"](_path["default"].join(__dirname, publicDictionary)));
  (0, _index["default"])(app);

  var server = _http["default"].createServer(app);

  require('reload')(server, app); // browsersync is a nice choice when modifying only views (with their css & js)
  //var bs = require('browser-sync').create();


  server.listen(port, function () {
    /*
    bs.init({
        open: false,
        ui: false,
        notify: false,
        proxy: {
            target: devhost + ':' + port,
            ws: true
        },
        files: ['./server/views/**'],
        port: port
    });
    */
    console.log('App (dev) is going to be running on port ' + port + ' (by browsersync).');
  });
  /*
  // 设置 Https
  var keyFile = path.join(__dirname, './privatekey.pem');
  var certFile = path.join(__dirname, './certrequest.pem');
    if(fs.existsSync(keyFile) && fs.existsSync(certFile)){
      var options = {
          key: fs.readFileSync(keyFile),
          cert: fs.readFileSync(certFile)
      };
        var httpsPort = 8083;
      var httpsServer = https.createServer(options, app);
      require('reload')(httpsServer, app);
        httpsServer.listen(httpsPort, function(){
          console.log('Https (dev) is now running on port ' + httpsPort + '!');
      });
  }
  */
} else {
  // static wildsAssets served by express.static() for production
  app.use(serverPrefix, _express["default"]["static"](_path["default"].join(__dirname, publicDictionary)));
  (0, _index["default"])(app);
  app.listen(port, function () {
    console.log('App (production) is now running on port ' + port + '!');
  });
}

module.exports = app;