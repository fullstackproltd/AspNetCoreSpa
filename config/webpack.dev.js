const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');
const webpackMergeDll = webpackMerge.strategy({ plugins: 'replace' });
const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-source-map',
    plugins: [
        new DllBundlesPlugin({
            bundles: {
                polyfills: [
                    'core-js',
                    {
                        name: 'zone.js',
                        path: 'zone.js/dist/zone.js'
                    },
                    {
                        name: 'zone.js',
                        path: 'zone.js/dist/long-stack-trace-zone.js'
                    }
                ],
                vendor: [
                    '@angular/platform-browser',
                    '@angular/platform-browser-dynamic',
                    '@angular/core',
                    '@angular/common',
                    '@angular/forms',
                    '@angular/http',
                    '@angular/router',
                    'rxjs',
                    'bootstrap',
                    'ng2-translate',
                    '@ng-bootstrap/ng-bootstrap'
                ]
            },
            dllDir: './wwwroot/dist',
            webpackConfig: webpackMergeDll(commonConfig, {
                devtool: 'cheap-module-source-map',
                plugins: []
            })
        })
    ]
});
