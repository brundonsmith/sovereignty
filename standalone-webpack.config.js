const webpack = require('webpack');
const path = require('path');
var baseConfig = require('./base-webpack.config.js');

module.exports = env => ({...baseConfig, ...{
  entry: env.entry || 'index.js',
  plugins: [
    new webpack.DefinePlugin({
      DYNAMIC: false
    })
  ],
  output: {
    filename: 'game.js',
    path: path.resolve(__dirname, 'dist')
  }
}})
