var path = require("path");
var webpack = require("webpack");

var cfg = {
  devtool: "source-map",
  entry: [
    "./out/Entry.js",
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080/',
  ],
  output: {
    path: path.join(__dirname, "public"),
    publicPath: "/public/",
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
    ]
    // ,
    // loaders: [
    //   {
    //     test: /Entry\.js$/,
    //     exclude: /node_modules/,
    //     loaders: [
    //       'webpack-module-hot-accept' // add this last
    //     ]
    //   }
    // ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};

module.exports = cfg;
