const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = function (env = {}, args) {
  return {
    mode: args.mode,
    devtool: 'source-map',
    entry: [path.resolve(__dirname, 'src/index.js')],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.min.js'
    },
    target: ['es5', 'web'],
    devServer: {
      historyApiFallback: true,
      hot: true,
      open: true,
      liveReload: true,
      progress: true,
      open: true,
      port: 5000
    },
    resolve: {
      extensions: ['.js'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        filename: 'index.html'
      }),
      new webpack.ProgressPlugin()
    ]
  };
};
