const webpack = require('webpack');
const path = require('path');
var baseConfig = require('./base-webpack.config.js');

module.exports = env => {
  return {...baseConfig, ...{
    entry: path.resolve(__dirname, 'src/runner/index.js'),
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          PROJECT_ENTRY: JSON.stringify(path.resolve(__dirname, env.project))
        }
      })
    ],
    output: {
      filename: 'game.js',
      path: path.resolve(__dirname, 'src/runner')
    }
  }}
}
