const { resolve } = require('path')

module.exports = {
  // mode: 'development',
  mode: 'production',
  entry: {
    'login': './src/login.js',
    'journal.index': './src/journal.index.js',

    'journal.01': './src/journal.01.js',
    'journal.01-save': './src/journal.01-save.js',
    'journal.01-borrow': './src/journal.01-borrow.js',
    'journal.01-return': './src/journal.01-return.js',

    'journal.02': './src/journal.02.js'
  },

  devtool: 'inline-source-map',

  output: {
    path: resolve(__dirname, './dist/assets/js'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        /*
        使用html-loader, 将html内容存为js字符串, 比如当遇到
        import htmlString from './template.html';
        template.html的文件内容会被转成一个js字符串, 合并到js文件里.
        */
        use: 'html-loader'
      }
    ]
  },
}
