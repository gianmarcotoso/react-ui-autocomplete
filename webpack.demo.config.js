var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./demo/index.js",
    output: {
        path: __dirname + "/demo-dist",
        filename: "js/index.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader!autoprefixer-loader" },
            { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["react-hot", "babel"] }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ["node_modules", "src"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './demo/index.html',
            inject: 'body'
        }),
        new webpack.ProvidePlugin({

        }),
    	new webpack.DefinePlugin({
    	    'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    	    }
    	}),
    ],
    devServer: {
        port: 8086
    },
    devtool: 'source-map',
    node: {
        //console: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
