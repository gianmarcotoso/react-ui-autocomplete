var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require("./webpack.demo.config.js");
var compiler = webpack(config);
var server = new WebpackDevServer(compiler);
server.listen(8086);
