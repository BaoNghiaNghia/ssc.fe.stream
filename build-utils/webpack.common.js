const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/, // Sử dụng style-loader, css-loader cho file .css
        use: ["style-loader", "css-loader"]
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
    // alias: {
    //   // Assume that the `src` folder is located at the root folder
    //   '@': path.resolve('../src'),
    // },
    alias: {
      assets: path.resolve(__dirname, 'src/assets/'),
      components: path.resolve(__dirname, 'src/components/'),
      contexts: path.resolve(__dirname, 'src/contexts/'),
      layouts: path.resolve(__dirname, 'src/layouts/'),
      theme: path.resolve(__dirname, 'src/theme/'),
      variables: path.resolve(__dirname, 'src/variables/'),
      views: path.resolve(__dirname, 'src/views/')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'MKStream Application',
      template: path.resolve(__dirname, '..', './public/index.html'),
      favicon: path.resolve(__dirname, '..', './public/favicon.ico')
    }),
  ],
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'bundle.js',
  },
  // devServer: {
  //   port: 16100,  // Set the custom port
  //   open: true,   // Automatically opens the browser
  //   hot: true,    // Enables Hot Module Replacement
  //   compress: true,  // Enable gzip compression
  //   historyApiFallback: true, // Fallback to index.html for SPA
  //   host: '0.0.0.0',  // Allows external access to the development server
  // },
};
