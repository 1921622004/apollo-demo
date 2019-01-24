const webpackMerge = require('webpack-merge');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');

const baseConfig = require('./webpack.base');

module.exports = webpackMerge(baseConfig,{
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer:[
      new UglifyjsPlugin({
        parallel: true
      })
    ]
  }
})
