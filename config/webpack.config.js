var path = require('path');
var helpers = require('./helpers');
var webpack = require('webpack');
var merge = require('extendify')({ isDeep: true, arrays: 'concat' });
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('styles.css');
var devConfig = require('./webpack.config.dev');
var prodConfig = require('./webpack.config.prod');
var isDevBuild = process.argv.indexOf('--env.prod') < 0;

console.log("==========Is Dev Build = " + isDevBuild + " ============")

module.exports = merge({
    resolve: {
        /*
       * An array of extensions that should be used to resolve modules.
       *
       * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
        extensions: ['.ts', '.js', '.json', '.scss', '.html'],

        // An array of directory names to be resolved to the current directory
        modules: [helpers.root('Client'), 'node_modules'],
    },
    module: {
        rules: [
            { test: /\.ts$/, exclude: [/\.(spec|e2e)\.ts$/], loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router-loader'] },
            { test: /\.html$/, loader: "html-loader" },
            { test: /\.css/, loader: extractCSS.extract(['css']) },
            { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader?sourceMap'] },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url-loader?limit=10000' },
            { test: /\.(jpg|png|gif)$/, loader: 'file-loader' }
        ]
    },
    entry: {
        'main': './Client/main.ts'
    },
    output: {
        path: path.join(__dirname, '../wwwroot', 'dist'),
        filename: '[name].js',
        publicPath: '/dist/'
    },
    profile: true,
    plugins: [
        extractCSS,
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require('../wwwroot/dist/vendor-manifest.json')
        }),
        // To eliminate warning
        // https://github.com/AngularClass/angular2-webpack-starter/issues/993
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(isDevBuild ? 'Development' : 'Production')
            }
        })
    ]
}, isDevBuild ? devConfig : prodConfig);
