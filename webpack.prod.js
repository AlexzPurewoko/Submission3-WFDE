const { merge } = require('webpack-merge');
const common = require('./webpack.common');

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
    /*rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env",]
            }
          },
        ],
      },
    ],*/

    /*rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,

        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: './tsconfig.prod.json',
              transpileOnly: true
            }
          }
        ],
      }
    ]*/
  }
});
