const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname,'build')
    },
    modules:{
        rules:[
            {
                test: /\.(less|css)$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use:["less-loader","css-loader"]
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ExtractTextWebpackPlugin('css/style.css')
    ]
}