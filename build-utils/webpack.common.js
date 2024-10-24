const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.js'),
  mode: 'production', // Enable production optimizations like tree shaking
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name(resourcePath, resourceQuery) {
            if (process.env.NODE_ENV === 'development') {
              return '[path][name].[ext]';
            }
            return '[contenthash].[ext]';
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.*', '.js', '.jsx'],
    alias: {
      assets: path.resolve(__dirname, 'src/assets/'),
      components: path.resolve(__dirname, 'src/components/'),
      contexts: path.resolve(__dirname, 'src/contexts/'),
      layouts: path.resolve(__dirname, 'src/layouts/'),
      theme: path.resolve(__dirname, 'src/theme/'),
      variables: path.resolve(__dirname, 'src/variables/'),
      views: path.resolve(__dirname, 'src/views/'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'MKStream Application',
      template: path.resolve(__dirname, '..', './public/index.html'),
      favicon: path.resolve(__dirname, '..', './public/favicon.ico'),
    }),
    new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
  ],
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
  },
  performance: {
    hints: false, // Disable performance warnings about large bundles
  },
};
