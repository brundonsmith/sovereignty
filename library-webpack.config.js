const webpack = require('webpack');
const path = require('path');
var baseConfig = require('./base-webpack.config.js');

module.exports = env => ({...baseConfig, ...{
  entry: './src/library/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'src/library')
  }
}})
