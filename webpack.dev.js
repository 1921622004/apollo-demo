const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const baseConfig = require('./webpack.base.js');

const devConfig = webpackMerge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
});
const compiler = webpack(devConfig);
const server = new WebpackDevServer(compiler,{
  contentBase: './build',
  open: true,
  inline: true
});
server.listen(4444);