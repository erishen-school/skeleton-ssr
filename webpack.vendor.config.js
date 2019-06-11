/**
 * Created by lei_sun on 2018/3/12.
 */
const webpack = require('webpack');
const path = require('path');

const vendors = [
    'react',
    'react-dom',
    'react-redux',
    'react-router-dom',
    'redux',
    'redux-thunk',
    'redux-saga',
    'lodash'
];

module.exports = {
    entry: {
        vendor: vendors
    },
    mode: 'production',
    output: {
        path: path.resolve(__dirname, './public/js'),
        filename: '[name].[chunkhash].js',
        library: '[name]_[chunkhash]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "manifest.json"),
            name: '[name]_[chunkhash]',
            context: __dirname
        }),
    ],
};