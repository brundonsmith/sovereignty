const webpack = require('webpack');
const path = require('path');
var baseConfig = require('./base-webpack.config.js');

module.exports = env => ({...baseConfig, ...{
  entry: './src/index.ts',
  plugins: [
    new webpack.DefinePlugin({
      DYNAMIC: true
    })
  ],
  output: {
    filename: 'three-engine.js',
    path: __dirname
  }
}})

/*[
    {...baseConfig, ...{
      entry: env.entry || 'index.js',
      output: {
        filename: 'game.js',
        path: path.resolve(__dirname, 'dist')
      }
    }},
    {...baseConfig, ...{
      entry: './src/index.ts',
      output: {
        filename: 'three-engine.js',
        path: path.resolve(__dirname, 'dist')
      }
    }}
  ]
*/
