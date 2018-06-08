const { resolve } = require('path')

module.exports = {
  mode: 'development',
  // mode: 'production',
  entry: {
    'index': './src/index.js',

    'user.login': './src/user.login.js'
  },

  // devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['env'] }
      },
    ]
  },

  output: {
    path: resolve(__dirname, './dist/assets/js'),
    filename: '[name].js'
  },
}
