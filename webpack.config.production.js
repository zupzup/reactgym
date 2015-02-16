var webpack = require('webpack');

module.exports = {
  entry: './scripts/index',
  output: {
    path: __dirname + '/www/scripts',
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['jsx?harmony'] }
    ]
  }
};
