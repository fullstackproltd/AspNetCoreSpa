const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');
const webpackMergeDll = webpackMerge.strategy({ plugins: 'replace' });
const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-source-map',
    output: {
        filename: '[name].js',
    },
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
                    '@angular/animations',
                    '@angular/platform-browser',
                    '@angular/platform-browser-dynamic',
                    '@angular/core',
                    '@angular/common',
                    '@angular/forms',
                    '@angular/http',
                    '@angular/router',
                    'rxjs',
                    'angular2-jwt',
                    '@ngrx/core',
                    '@ngrx/store',
                    '@ngrx/store-devtools',
                    '@ngx-translate/core',
                    '@ng-bootstrap/ng-bootstrap'
                ]
            },
            dllDir: path.join(__dirname, '../wwwroot', '/dist'),
            webpackConfig: webpackMergeDll(commonConfig, {
                devtool: 'cheap-module-source-map',
                plugins: []
            })
        }),
        /**
         * Plugin: AddAssetHtmlPlugin
         * Description: Adds the given JS or CSS file to the files
         * Webpack knows about, and put it into the list of assets
         * html-webpack-plugin injects into the generated html.
         *
         * See: https://github.com/SimenB/add-asset-html-webpack-plugin
         */
        new AddAssetHtmlPlugin([
            { filepath: helpers.root(`wwwroot/dist/${DllBundlesPlugin.resolveFile('polyfills')}`) },
            { filepath: helpers.root(`wwwroot/dist/${DllBundlesPlugin.resolveFile('vendor')}`) }
        ]),

    ]
});
