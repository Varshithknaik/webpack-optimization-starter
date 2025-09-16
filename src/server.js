const express = require("express");
const path = require("path");
const app = express();

app.get("/", function (req, res) {
  const absolutePathToHtmlFile = path.resolve(__dirname, "../dist/index.html");
  res.sendFile(absolutePathToHtmlFile);
});

app.use("/", express.static(path.resolve(__dirname, "../dist")));

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
