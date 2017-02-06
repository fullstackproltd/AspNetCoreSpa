var webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');
const OptimizeJsPlugin = require('optimize-js-plugin');
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    entry: {
        'polyfills': './Client/polyfills.ts'
    },
    output: {
        filename: '[name].[chunkhash].bundle.js',
        sourceMapFilename: '[name].[chunkhash].bundle.map',
        chunkFilename: '[id].[chunkhash].chunk.js'
    },
    plugins: [
        /**
     * Webpack plugin to optimize a JavaScript file for faster initial load
     * by wrapping eagerly-invoked functions.
     *
     * See: https://github.com/vigneshshanmugam/optimize-js-plugin
     */

        new OptimizeJsPlugin({
            sourceMap: false
        }),
        new BundleAnalyzerPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            sourceMap: true
        })
    ]
});
