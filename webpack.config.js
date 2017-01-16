var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
webpackConfig = {
    context: __dirname,
    entry: {
        bundle: './src/originalAssets/app/app.js',
        styles: './src/originalAssets/sass/main.scss'
    },
    output: {
        filename: '[name].js',
        path: './src/assets',
        library: '[name]'
    },
    resolve: {
        extensions: ['', '.js']
    },
    devtool: '#cheap-module-source-map',
    module: {
        loaders: [
            {
                test: /\.js/,
                exclude: [/node_modules/],
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'stage-0', 'stage-1']
                }
            },
            {test: /\.html$/, loader: "html"},
            {test: /\.json/, loader: "json"},
            { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!resolve-url!sass-loader?sourceMap')
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                loader: 'file-loader'
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css', {
            allChunks: true
        })
    ]
};
module.exports = webpackConfig;