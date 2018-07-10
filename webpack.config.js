const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const outputDirectory = 'dist';

module.exports = {
  devtool: 'source-map',
  entry: './src/server/server.js',
  output: {
    path: path.resolve(__dirname, outputDirectory),
    filename: "server.js",
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: "babel-loader",
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  target: "node",
  externals: nodeExternals(),
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
  ]
};