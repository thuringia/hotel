const path = require("path");

module.exports = require("./webpack.base.config")({
  /*
  // Add hot reloading in development
  entry: [
    "eventsource-polyfill", // Necessary for hot reloading with IE
    "webpack-hot-middleware/client?reload=true",
    "react-hot-loader/patch",
    path.join(process.cwd(), "app/Entry.js")
  ],
  */
  entry: [path.join(process.cwd(), "app/Entry.js")],

  externals: {
    jsdom: "window",
    cheerio: "window",
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": "window",
    "react/addons": true
  },

  /*
  module: {
    rules: {
      test: /\.jsx?$/, // Transform all .js files required somewhere with Babel
      exclude: /node_modules/,
      enforce: "pre",
      use: ["react-hot-loader/webpack"]
    }
  },
  */

  // Don't use hashes in dev mode for better performance
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js"
  },

  /*
  // Add development plugins
  plugins: dependencyHandlers().concat(plugins), // eslint-disable-line no-use-before-define

  // Emit a source map for easier debugging
  devtool: "cheap-module-eval-source-map",
  */

  performance: {
    hints: false
  }
});
