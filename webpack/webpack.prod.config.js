const common = require("./webpack.common.config.js");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const glob = require("glob");
const path = require("path");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { chunk, min } = require("lodash-es");

module.exports = merge(common, {
  output: {
    filename: "js/[name].[contenthash:12].js",
  },
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [
      `...`, // To keep the existing minimizer
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["imagemin-mozjpeg", { quality: 40 }],
              ["imagemin-pngquant", { quality: [0.65, 0.9], speed: 4 }],
              ["imagemin-gifsicle", { interlaced: true }],
              [
                "imagemin-svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      removeViewBox: true,
                      active: false,
                      params: {
                        overrides: {
                          removeViewBox: true,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
        generator: [
          {
            type: "asset",
            preset: "webp-custom-name",
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: ["imagemin-webp"],
            },
          },
        ],
      }),
    ],
    runtimeChunk: "single", // Webpack will create an single runtime file
    splitChunks: {
      // Strategy #1
      // cacheGroups: {
      //   jQuery: {
      //     test: /[\\/]node_modules[\\/]jquery[\\/]/,
      //     chunks: "initial",
      //     name: "jquery",
      //   },
      //   bootstrap: {
      //     test: /[\\/]node_modules[\\/]bootstrap[\\/]/,
      //     chunks: "initial",
      //     name: "bootstrap",
      //   },
      // },
      // Strategy #2
      // chunks: "all",
      // maxSize: 140000,
      // minSize: 50000,
      // name(module, chunks, cacheGroupKey) {
      //   const filePathAsArray = module
      //     .identifier()
      //     .split("/")
      //     .reduceRight((item) => item)
      //     .replace(/[^a-zA-Z0-9_.-]/g, "");
      //   const fileName = filePathAsArray[filePathAsArray.length - 1];
      //   // return `${cacheGroupKey}-${fileName}`;
      //   return fileName;
      // },
      // Startegy 2 Safer
      // chunks: "all",
      // maxSize: 140000,
      // minSize: 5000,
      // name(module, chunks, cacheGroupKey) {
      //   const match =
      //     module.context &&
      //     module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
      //   const packageName = match ? match[1].replace("@", "") : "misc";
      //   return `${cacheGroupKey}-${packageName}`;
      // },
      // Strategy #3
      // chunks: "all",
      // maxSize: Infinity,
      // cacheGroups: {
      //   node_modules: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name: "node_modules",
      //   },
      // },
      // Strategy #4
      // chunks: "all",
      // maxSize: Infinity,
      // cacheGroups: {
      //   node_modules: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name(module) {
      //       const packageName = module.context.match(
      //         /[\\/]node_modules[\\/](.*?)([\\/]|$)/
      //       )[1];
      //       return packageName;
      //     },
      //   },
      // },
      //
      //Custom Strategy for code-splitting
      chunks: "all",
      maxSize: Infinity,
      minSize: 2000,
      cacheGroups: {
        jQuery: {
          test: /[\\/]node_modules[\\/]jquery[\\/]/,
          chunks: "initial",
          name: "jquery",
        },
        bootstrap: {
          test: /[\\/]node_modules[\\/]bootstrap[\\/]/,
          chunks: "initial",
          name: "bootstrap",
        },
        lodash: {
          test: /[\\/]node_modules[\\/]lodash-es[\\/]/,
          chunks: "initial",
          name: "lodash",
        },
        node_modules: {
          test: /[\\/]node_modules[\\/]/,
          name: "node_modules",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.css$/,
        include: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[hash:base64]",
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                quietDeps: true,
                silenceDeprecations: ["import"],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "./images/[name].[contenthash:12][ext]",
        },
        // use: [
        //   {
        //     loader: "image-webpack-loader",
        //     options: {
        //       mozjpeg: {
        //         quality: 40,
        //       },
        //       pngquant: {
        //         quality: [0.65, 0.9],
        //         speed: 4,
        //       },
        //     },
        //   },
        // ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:12].css", // Default of contenthash is just name itself :12 makes it to include just 12 characters
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, "../src/")}/**/*`, {
        nodir: true,
      }),
    }),
  ],
});
