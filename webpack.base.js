const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry:{
        main: __dirname + '/src/index'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: ["less-loader", "css-loader"]
                })
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use:[
                    "babel-loader",
                    "ts-loader"
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ExtractTextWebpackPlugin('css/style.css'),
    ]
}