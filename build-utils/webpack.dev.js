const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: path.resolve(__dirname, '..', './.env.development'),
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, '..', './dist'),
    port: 16100,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    allowedHosts: [
      'localhost',
      'sscsalmon.ddns.net',
    ],
  },
  devtool: 'inline-source-map',
};
