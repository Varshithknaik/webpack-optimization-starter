const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    // clean: true
    // clean: {
    //   // dry: true, // webpack will logs which files would be removed, but won't actually delete them
    //   keep: /\.css/ // webpack to keep the files
    // }
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [ { loader: 'html-loader' }]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/template.html',
    }),
    // new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: [
    //     '**/*', // **/* applies only inside Webpack’s output.path (usually dist).
    //     path.join(process.cwd(), 'build/**/*'), // The path.join(process.cwd(), 'build/**/*') explicitly tells it: also clean inside build.
    //   ]
    // })
  ]
}

module.exports = config;