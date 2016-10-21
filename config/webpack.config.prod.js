var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    plugins: [
        // new webpack.LoaderOptionsPlugin({
        //     minimize: true,
        //     debug: false
        // }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            sourceMap: true
        })
    ]
};
