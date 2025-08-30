const common = require("./webpack.common.config.js");
const { merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(common, {
  output: {
    filename: "bundle.js",
  },
  mode: "development",
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, "../dist"),
    },
    devMiddleware: {
      index: "index.html",
      writeToDisk: true, // with this dev server will write code inside the dist folder
    },
    client: {
      overlay: true, // Show in full screen incase of error or warning
    },
    liveReload: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.css$/,
        include: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]--[md5:hash:7]",
              },
            },
          },
        ],
      },
    ],
  },
});
