var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require("./webpack.demo.config.js");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8086/", "webpack/hot/dev-server");
config.plugins.push(new webpack.HotModuleReplacementPlugin());
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {hot: true});
server.listen(8086);
