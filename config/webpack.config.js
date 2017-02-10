let path = require('path');
let helpers = require('./helpers');
let webpack = require('webpack');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
let ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const ngcWebpack = require('ngc-webpack');
let devConfig = require('./webpack.dev');
let prodConfig = require('./webpack.prod');
let isDevBuild = process.argv.indexOf('--env.prod') < 0;

const HMR = helpers.hasProcessFlag('hot');
const AOT = helpers.hasNpmFlag('aot');

console.log("==========Is Dev Build = " + isDevBuild + " ============")
console.log("==========Is AOT Build = " + AOT + " ============")

let commonConfig = {
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
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    entry: {
        'polyfills': './Client/polyfills.ts',
        'main': AOT ? './Client/main.aot.ts' : './Client/main.ts'
    },
    output: {
        path: path.join(__dirname, '../wwwroot', 'dist'),
        filename: '[name].js',
        publicPath: '/dist/'
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
        })
    ]
};

module.exports = commonConfig;
