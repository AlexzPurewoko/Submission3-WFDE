const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const webpackPwaManifest = require("webpack-pwa-manifest");
const workboxPlugin = require("workbox-webpack-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/scripts/n_index.ts'),
    actSw: path.resolve(__dirname, "src/scripts/n_sw.ts")
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name]-[hash].app.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all', 
          enforce: true
        }
      }
    }
  },
  
  module: {
    rules: [
      {
        test:/\.css$/i,
        use : [
          {
            loader: MiniCssExtractPlugin.loader
          }
          , 'css-loader']
      },
      {
        test:/\.(sa|sc)ss$/i,
        use : [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/styles/'
            }
          }
          , 'css-loader', {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              webpackImporter: false,
              sassOptions: {
                includePaths: ['./node_modules']
              }
            }
          }]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: 'fonts/[name].[ext]',
            }
        }]
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $ : 'jquery',
      jQuery: 'jquery'
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash].style.css',
      chunkFilename: '[name]-[hash].style.css'
    }),

    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`,  { nodir: true }),
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/n_index.html'),
      filename: 'index.html',
      favicon: "./src/public/images/icons/restaurant-icon.svg",

    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        }
      ],
    }),


    new webpackPwaManifest({
      name: "Favorite Restaurant",
      short_name: "FavResto",
      description: "Deliver a best Restaurant information for you!",
      background_color: "#fff",
      theme_color: "#d76700",
      crossorigin: "use-credentials",
      display: "standalone",
      start_url: "/index.html",
      scope: "/",
      orientation: "any",
      inject: true,
      ios: true,
      icons: [
        {
          src: path.resolve("src/public/images/icons/icon.png"),
          sizes: [96, 128, 144, 192, 256, 384, 512],
          purpose: "any maskable",
          destination: "images/icons",
          ios: true
        }
      ]
    }),

    new workboxPlugin.InjectManifest({
      swSrc: "./src/template-sw.js",
      swDest: "service-worker.js"
    })
  ],
};
