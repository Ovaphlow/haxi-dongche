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

    'journal.02': './src/journal.02.js',
    'journal.02-save': './src/journal.02-save.js',
    'journal.02-save.01': './src/journal.02-save.01.js',
    'journal.02-save.02': './src/journal.02-save.02.js',
    'journal.02-save.03': './src/journal.02-save.03.js',
    'journal.02-save.04': './src/journal.02-save.04.js',
    'journal.02-check': './src/journal.02-check.js',
    'journal.02-verify': './src/journal.02-verify.js',
    'journal.02-verify.leader': './src/journal.02-verify.leader.js',
    'journal.02-verify.verify': './src/journal.02-verify.verify.js',
    'journal.02-stats': './src/journal.02-stats.js',
    'journal.02-detail': './src/journal.02-detail.js',

    'admin.dept-list': './src/admin.dept-list.js',
    'admin.dept-save': './src/admin.dept-save.js',
    'admin.dept': './src/admin.dept.js'
  },

  // devtool: 'inline-source-map',

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
