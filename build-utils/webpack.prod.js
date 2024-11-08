const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production',
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '..', `.env.${process.env.VENDOR}`),
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, '..', `./${process.env.BUILD}`),
  },
  devtool: 'source-map',
};
