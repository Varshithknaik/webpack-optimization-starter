const common = require('./webpack.common.config.js');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge( common , {
  output: {
    filename: 'bundle.js'
  },
  mode: 'development',
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname , '..'),
    },
    devMiddleware: {
      index: 'index.html',
      writeToDisk: true,  // with this dev server will write code inside the dist folder
    },
    client: {
      overlay: true // Show in full screen incase of error or warning
    },
    liveReload: false
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
})