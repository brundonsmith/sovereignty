const webpack = require('webpack');

module.exports = {
  target: 'electron-renderer',
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [ 'node_modules', 'src', 'example-project' ],
    extensions: [ ".ts", ".js" ]
  }
}
