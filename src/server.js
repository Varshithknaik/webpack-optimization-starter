const express = require("express");
const path = require("path");
const expressStaticGzip = require("express-static-gzip");

const app = express();

if (process.env.NODE_ENV == "development") {
  console.log("development mode");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const configuration = require("../webpack/webpack.dev.config");
  const webpack = require("webpack");
  const webpackCompiler = webpack(configuration);
  app.use(
    webpackDevMiddleware(webpackCompiler, configuration.devServer.devMiddleware)
  );

  const webpackHotMiddleware = require("webpack-hot-middleware");
  app.use(webpackHotMiddleware(webpackCompiler));
} else {
  console.log("production mode");
}

app.get("/", function (req, res) {
  const absolutePathToHtmlFile = path.resolve(__dirname, "../dist/index.html");
  res.sendFile(absolutePathToHtmlFile);
});

// app.use("/", express.static(path.resolve(__dirname, "../dist")));
app.use(
  "/",
  expressStaticGzip(path.resolve(__dirname, "../dist"), {
    enableBrotli: true,
    orderPreference: ["br", "gz"],
  })
);

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
