const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const baseConfig = require('./webpack.base.js');

const devConfig = webpackMerge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ]
});
const compiler = webpack(devConfig);
const server = new WebpackDevServer(compiler,{
  contentBase: './build',
  open: true,
  watch: true
});
server.listen(4444);