const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '0.0.0.0',
    disableHostCheck: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        // use: 'ts-loader',
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.webpack.json'
        }
      },
    ]
  }
});
