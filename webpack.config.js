var path = require("path");
var webpack = require("webpack");
module.exports = {
  entry: [__dirname + "/src/index.html", "./src/app.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js"
  },
  devServer: {
    contentBase: "./dist"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        loader: "file-loader"
      },
      { test: /bootstrap\/dist\/js\/umd\//, loader: "imports?jQuery=jquery" },
      {
        test: /\.html$/,
        loader: "file-loader?name=[name].[ext]"
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  stats: {
    colors: true
  },
  devtool: "source-map"
};
