const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
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
  },
  output: {
    filename: 'three-engine.js',
    path: path.resolve(__dirname, 'dist')
  }
};
