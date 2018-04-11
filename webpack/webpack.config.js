const { resolve } = require('path')

module.exports = {
  // mode: 'development',
  mode: 'production',
  entry: {
    'journal.index': './src/journal.index.js',
    'journal.01': './src/journal.01.js'
  },

  devtool: 'inline-source-map',

  devServer: {
    compress: true,
    contentBase: './dist',
    host: '0.0.0.0',
    // hot: true,
    port: 80,
    proxy: {
      '/billboard/api': 'http://localhost:8000'
    }
  },

  output: {
    path: resolve(__dirname, '../node/public/assets/js'),
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

  resolve: {
    alias: {
      'vue': 'vue/dist/vue.common.js'
    }
  }
}
