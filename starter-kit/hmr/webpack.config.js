var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var poststylus = require('poststylus');

var TARGET_ENV = process.env.npm_lifecycle_event === 'build' ? 'production' : 'development';

var commonConfig = {
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, "public"),
    publicPath: "",
    filename: "[hash].js"
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader"
      }
    ],
    loaders: [
      {
        test: /\.(eot|ttf|woff|woff2|svg|png)$/,
        exclude: /node_modules/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'Source/static/index.html',
      inject:   'body',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
        {
          from: 'Source/static/img/',
          to:   'img/'
        }
    ])
  ],
  stylus: {
      use: [poststylus(['autoprefixer'])]
  }
};

if ( TARGET_ENV === 'development' ) {
  console.log( 'Serving locally...');
  module.exports = merge(commonConfig, {
    entry: [
      './Source/static/index.js',
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080/',
    ],

    module: {
      loaders: [
        {
          test: /\.styl$/,
          exclude: /node_modules/,
          loaders: [
            'style-loader',
            'css-loader',
            'stylus-loader'
          ]
        }
      ]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ]

  });
}

if ( TARGET_ENV === 'production' ) {
  console.log( 'Building for prod...');

  module.exports = merge( commonConfig, {

    entry: path.join( __dirname, 'Source/static/index.js' ),

    module: {
      loaders: [
        {
          test: /\.styl$/,
          loader: ExtractTextPlugin.extract( 'style-loader', [
            'css-loader',
            'stylus-loader'
          ])
        }
      ]
    },

    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'src/static/img/',
          to:   'static/img/'
        }
      ]),

      new webpack.optimize.OccurenceOrderPlugin(),

      // extract CSS into a separate file
      new ExtractTextPlugin( './[hash].css', { allChunks: true } ),

      // minify & mangle JS/CSS
      new webpack.optimize.UglifyJsPlugin({
          minimize:   true,
          compressor: { warnings: false }
          // mangle:  true
      })
    ]

  });
}
