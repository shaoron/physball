const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const webpack = require('webpack');

  module.exports = {
    entry: {
      app: './src/index.js'
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './doc',
      hot: true
    },
    plugins: [
      new CleanWebpackPlugin(['doc']),
      new HtmlWebpackPlugin({
        title: 'Physball'
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'doc')
    }
  };