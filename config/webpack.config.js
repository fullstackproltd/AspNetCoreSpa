const path = require('path');
const helpers = require('./helpers');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const ngcWebpack = require('ngc-webpack');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const isDevBuild = process.argv.indexOf('--env.prod') < 0;

const HMR = helpers.hasProcessFlag('hot');
const AOT = helpers.hasNpmFlag('aot');

console.log("==========Is Dev Build = " + isDevBuild + " ============")
console.log("==========Is AOT Build = " + AOT + " ============")

let commonConfig = {
    entry: {
        'main': AOT ? './Client/main.aot.ts' : './Client/main.ts'
    },
    output: {
        path: path.join(__dirname, '../wwwroot', 'dist'),
        publicPath: '/dist/'
    },
    resolve: {
        /*
       * An array of extensions that should be used to resolve modules.
       *
       * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
        extensions: ['.ts', '.js', '.json', '.scss', '.css', '.html'],

        // An array of directory names to be resolved to the current directory
        modules: [helpers.root('Client'), 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/, exclude: [/\.(spec|e2e)\.ts$/],
                use: [
                    {
                        loader: 'ng-router-loader',
                        options: {
                            loader: 'async-import',
                            genDir: 'compiled',
                            aot: AOT
                        }
                    },
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.css$/, loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            { test: /\.scss$/, use: ['to-string-loader', 'css-loader', 'sass-loader'] },
            { test: /\.html$/, use: 'html-loader' },
            { test: /\.json$/, use: 'json-loader' },
            { test: /\.(jpg|png|gif)$/, use: 'file-loader' },
            { test: /\.(woff|woff2|eot|ttf|svg)$/, use: 'file-loader' }
        ]
    },
    profile: true,
    plugins: [
        new ExtractTextPlugin("vendor.css"),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(isDevBuild ? 'Development' : 'Production')
            }
        }),
        /*
       * Plugin: ForkCheckerPlugin
       * Description: Do type checking in a separate process, so webpack don't need to wait.
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
       */
        new CheckerPlugin(),
        new ngcWebpack.NgcWebpackPlugin({
            disabled: !AOT,
            tsConfig: helpers.root('tsconfig.webpack.json')
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['main', 'vendor', 'polyfills']
        // }),
        /**
         * Plugin: ContextReplacementPlugin
         * Description: Provides context to Angular's use of System.import
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
         * See: https://github.com/angular/angular/issues/11580
         */
        new ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
            helpers.root('Client'), // location of your Client
            {
                // your Angular Async Route paths relative to this root directory
            }
        ),

    ]
};

module.exports = commonConfig;
