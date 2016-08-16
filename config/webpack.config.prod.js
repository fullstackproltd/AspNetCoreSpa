var webpack = require('webpack');
var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new DedupePlugin(),
        // new UglifyJsPlugin({
        //     // beautify: true, //debug
        //     // mangle: false, //debug
        //     // dead_code: false, //debug
        //     // unused: false, //debug
        //     // deadCode: false, //debug
        //     // compress: {
        //     //   screw_ie8: true,
        //     //   keep_fnames: true,
        //     //   drop_debugger: false,
        //     //   dead_code: false,
        //     //   unused: false
        //     // }, // debug
        //     // comments: true, //debug


        //     beautify: false, //prod
        //     mangle: { screw_ie8: true }, //prod
        //     compress: { screw_ie8: true, keep_fnames: true }, //prod
        //     comments: false //prod
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: { warnings: false },
        //     minimize: true,
        //     mangle: false // Due to https://github.com/angular/angular/issues/6678
        // })
    ]
};
