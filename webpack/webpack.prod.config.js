const common = require('./webpack.common.config.js');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge( common , {
  output: {
    filename: '[name].[contenthash:12].js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:12].css'  // Default of contenthash is just name itself :12 makes it to include just 12 characters
    })
  ]
})