const webpack = require("webpack");
const path = require("path");
const { NodeServerPlugin } = require("webpack-node-server-plugin");

module.exports = {
  target: "node",
  mode: "development",
  stats: "minimal",
  entry: ["./src/index.js"],
  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "./server.js"
  },
  plugins: [new NodeServerPlugin()]
};
