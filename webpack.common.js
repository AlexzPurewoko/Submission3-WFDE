const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpackPwaManifest = require("webpack-pwa-manifest");
const workboxPlugin = require("workbox-webpack-plugin");

const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webp-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/scripts/index.ts'),
    actSw: path.resolve(__dirname, "src/scripts/sw.ts"),
    mainStyle: path.resolve(__dirname, "src/scripts/styles.ts"),
    materialIcons: path.resolve(__dirname, 'src/scripts/materialicons.ts')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name].js',
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
          'style-loader'
          , 'css-loader']
      },
      {
        test:/\.(sa|sc)ss$/i,
        use : [
          'style-loader'
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
      favicon: "./src/public/images/icons/restaurant-icon.svg",
      minify: {
        html5: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributese: true,
        useShortDoctype: true
      }

    }),

    new ScriptExtHtmlWebpackPlugin({
      custom: {
        test: /\.js$/,
        attribute: 'crossorigin',
        value: 'anonymous'
      },
      sync: ['main.js', 'mainStyle.js'],
      defaultAttribute: 'async',
      preload: {
        test: /\.js$/
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        }
      ],
    }),

    new ImageminWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)/,
          options: {
            quality: 26
          }
        }
      ],
      overrideExtension: true
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
