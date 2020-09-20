const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'none',
    entry:'./src/main.js',
    output:{
        filename: 'js/bundle.js',
        path: path.join(__dirname, 'dist')
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './public',
        open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.(less|css)$/,
                use: [
                    'style-loader',
                    'vue-style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'Webpack Task',
            inject: true,
            template: './public/index.html',
            favicon: './public/favicon.ico'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}