var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var poststylus = require('poststylus');

var cfg = {
  devtool: 'source-map',
  entry: [
    './Source/index.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080/',
  ],
  output: {
    path: path.join(__dirname, "public"),
    publicPath: "",
    filename: "bundle.js"
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader",
        include: "path.join(__dirname, 'public')"
      }
    ],
    loaders: [
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg|png)$/,
        exclude: /node_modules/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'Source/index.html',
      inject:   'body',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
        {
          from: 'Source/img/',
          to:   'img/'
        }
    ]),
    new webpack.HotModuleReplacementPlugin(),
  ],
  stylus: {
      use: [poststylus(['autoprefixer'])]
  }
};

module.exports = cfg;
