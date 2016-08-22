var path = require("path");
var webpack = require("webpack");

var cfg = {
  devtool: "source-map",
  entry: "./out/Main.js",
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
  },
  devServer: {
    contentBase: "out/",
    inline: true,
    publicPath: "/public/"
  }
};

module.exports = cfg;
