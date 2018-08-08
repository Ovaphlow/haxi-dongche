const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  devtool: 'inline-source-map',

  devServer: {
    contentBase: './dist',
    hot: true,
    port: 8000
  },

  entry: {
    'login': './src/login.js',
    'index': './src/index.js',

    'journal.02': './src/journal.02.js',
    'journal.02-detail': './src/journal.02-detail.js',
    'journal.02-save': './src/journal.02-save.js',
    'journal.02-check': './src/journal.02-check.js',
    'journal.02-jsy.content': './src/journal.02-jsy.content.js',
  },

  mode: 'development',
  // mode: 'production',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['env'] }
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({ filename: 'sign.html', template: './src/sign.html' }),

    new HtmlWebpackPlugin({ chunks: ['login'], filename: 'login.html', template: './src/login.html' }),
    new HtmlWebpackPlugin({ chunks: ['index'], filename: 'index.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['journal.02'], filename: 'journal.02.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['journal.02-detail'], filename: 'journal.02-detail.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['journal.02-save'], filename: 'journal.02-save.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['journal.02-check'], filename: 'journal.02-check.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['journal.02-jsy.content'], filename: 'journal.02-jsy.content.html', template: './src/index.html' }),
    new webpack.HotModuleReplacementPlugin()
  ],

  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
