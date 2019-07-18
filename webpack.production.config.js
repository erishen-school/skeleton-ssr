var webpack = require('webpack');
var path = require('path');
var _ = require('lodash');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var controllerConfig = require('./server/config/controller');

var entryObj = {};
_.each(controllerConfig.entrys, function(item, index){
    entryObj[item] = [ '@babel/polyfill', './client/page/' + item ];
});

var productionConfig = {
    entry: entryObj,
    mode: 'production',
    output: {
        filename: './page/[name]/bundle.js',
        path: path.resolve(__dirname, './public'),
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    module: {
        rules: [{
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            use: 'url-loader?limit=100000&context=client&name=[path][name].[ext]'
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
            })
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'resolve-url-loader', 'less-loader?sourceMap']
            })
        }, {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new CleanWebpackPlugin(['public/page']),
        new ExtractTextPlugin({
            filename: './page/[name]/index.css',
            allChunks: true
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.production.json')
        }),
        new webpack.ContextReplacementPlugin(
            /..[\/\\]..[\/\\]components/,
            /release/,
            true
        ),
        new UglifyJSPlugin(),
        new OptimizeCssAssetsPlugin()
    ]
};

module.exports = productionConfig;
