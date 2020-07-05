const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'development',
    entry:'./src/main.js',
    output:{
        filename: 'js/bundle.js',
        path: path.join(__dirname, '.dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader',
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    'file-loader',
                ]
            }
        ]
    },
    plugins: [new VueLoaderPlugin()]
}