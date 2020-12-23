const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 65536
    }
  },
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"]
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
    ]
  },

  plugins: [
    // new BundleAnalyzer(),

    new BrotliPlugin({
			test: /\.(js)$/
		}),
  ]
});
