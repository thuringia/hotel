/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import BundleAnalyzerPlugin from "webpack-bundle-analyzer";

export default options => ({
  mode: 'development',

  entry: options.entry,

  output: {
    path: path.join(__dirname, 'dist')
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    }]
  },



  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    "alias": {
      "lodash": path.resolve("./node_modules/lodash-es")
    },
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.join(__dirname, 'app'),
      'node_modules',
    ],
    mainFields: ["browser", "jsnext:main", "main"]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
  ],
});
