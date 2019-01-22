const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'build')
    },
    resolve:{
        extensions: ['.ts','.tsx','.js']
    },
    devServer: {
        contentBase: "./public",
        open: true,
        port: 4444
    },
    modules: {
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
                loaders: [
                    "ts-loader"
                ],
                include: path.resolve('src')
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