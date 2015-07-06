var commonConfig = require('./webpack-common.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack');

var prodLoaders = [
  // javascript/jsx loader - https://www.npmjs.com/package/babel-loader - without the react-hot loader
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['babel-loader?stage=0&optional=runtime'],
  }
]

module.exports = {
  entry: [
    // our entry file
    './app/main.jsx'
  ],
  output: {
    path: './build',
    publicPath: '/',
    filename: 'bundle.[chunkhash].js'
  },
  devtool:'source-map',
  module: {
    loaders: commonConfig.loaders.concat(prodLoaders)
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    commonConfig.indexPagePlugin
  ],
};
