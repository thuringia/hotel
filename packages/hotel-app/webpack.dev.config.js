const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = require("../hotel-templates/webpack.base.config")({
  // Add hot reloading in development
  entry: [path.join(process.cwd(), "app/Entry.jsx")],

  externals: {
    jsdom: "window",
    cheerio: "window",
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": "window",
    "react/addons": true
  },

  module: {
    rules: {
      test: /\.jsx?$/, // Transform all .js files required somewhere with Babel
      exclude: /node_modules/,
      enforce: "pre",
      use: ["react-hot-loader/babel"]
    }
  },

  // Don't use hashes in dev mode for better performance
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js"
  },

  // Add development plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: "app/index.html",
      inject: true
    })
  ],

  /*
  // Emit a source map for easier debugging
  devtool: "cheap-module-eval-source-map",
  */

  performance: {
    hints: false
  }
});
