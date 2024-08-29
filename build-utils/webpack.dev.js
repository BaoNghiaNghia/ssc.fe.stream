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
    port: 16100,  // Set the custom port
    open: true,   // Automatically opens the browser
    hot: true,    // Enables Hot Module Replacement
    compress: true,  // Enable gzip compression
    historyApiFallback: true, // Fallback to index.html for SPA
    host: '0.0.0.0',  // Allows external access to the development server,
    allowedHosts: [
      'localhost',
      'sscsalmon.ddns.net',    // Replace with your domain or IP address
    ],
  },
  devtool: 'inline-source-map',
};
