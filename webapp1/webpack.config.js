const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  devtool: 'inline-source-map',

  devServer: {
    // contentBase: './dist',
    hot: true,
    port: 8000
  },

  entry: {
    'login': './src/login.js',
    'index': './src/index.js',

    'admin.dept-list': './src/admin.dept-list.js',
    'admin.dept-save': './src/admin.dept-save.js',
    'admin.dept': './src/admin.dept.js',
    'admin.user-list': './src/admin.user-list.js',
    'admin.user-save': './src/admin.user-save.js',
    'admin.user': './src/admin.user.js',

    'journal.02': './src/journal.02.js',
    'journal.02-detail': './src/journal.02-detail.js',
    'journal.02-save': './src/journal.02-save.js',
    'journal.02-check': './src/journal.02-check.js',
    'journal.02-jsy.content': './src/journal.02-jsy.content.js',
    'journal.02-verify': './src/journal.02-verify.js',
    'journal.02-verify.leader': './src/journal.02-verify.leader.js',
    'journal.02-save.01': './src/journal.02-save.01.js',
    'journal.02-save.02': './src/journal.02-save.02.js',
    'journal.02-save.03': './src/journal.02-save.03.js',
    'journal.02-save.04': './src/journal.02-save.04.js',
    'journal.02-verify.p_bz': './src/journal.02-verify.p_bz.js',
    'journal.02-verify.qc': './src/journal.02-verify.qc.js',
    'journal.02-verify.p_dd': './src/journal.02-verify.p_dd.js',
    'journal.02-stats': './src/journal.02-stats.js',
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
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({ filename: 'sign.html', template: './src/sign.html' }),

    new HtmlWebpackPlugin({ chunks: ['login'], filename: 'login.html', template: './src/login.html' }),
    new HtmlWebpackPlugin({ chunks: ['index'], filename: 'index.html', template: './src/index.html' }),

    new HtmlWebpackPlugin({ chunks: ['admin.dept-list'], filename: 'admin.dept-list.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['admin.dept-save'], filename: 'admin.dept-save.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['admin.dept'], filename: 'admin.dept.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['admin.user-list'], filename: 'admin.user-list.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['admin.user-save'], filename: 'admin.user-save.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['admin.user'], filename: 'admin.user.html', template: './src/index.html' }),

    new HtmlWebpackPlugin({ chunks: ['journal.02'], filename: 'journal.02.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['journal.02-detail'], filename: 'journal.02-detail.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['journal.02-save'], filename: 'journal.02-save.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['journal.02-check'], filename: 'journal.02-check.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['journal.02-jsy.content'], filename: 'journal.02-jsy.content.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['journal.02-verify'], filename: 'journal.02-verify.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['journal.02-verify.leader'], filename: 'journal.02-verify.leader.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['journal.02-save.01'], filename: 'journal.02-save.01.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['journal.02-save.02'], filename: 'journal.02-save.02.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['journal.02-save.03'], filename: 'journal.02-save.03.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['journal.02-save.04'], filename: 'journal.02-save.04.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['journal.02-verify.p_bz'], filename: 'journal.02-verify.p_bz.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['journal.02-verify.qc'], filename: 'journal.02-verify.qc.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['journal.02-verify.p_dd'], filename: 'journal.02-verify.p_dd.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['journal.02-stats'], filename: 'journal.02-stats.html', template: './src/index.html' }),
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
