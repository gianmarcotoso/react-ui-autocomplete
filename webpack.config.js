var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, process.env.NODE_ENV === 'production' ? 'dist' : 'dev'),
        filename: "index.js",

	library: 'overlap-bar',
	libraryTarget: 'umd'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader!autoprefixer-loader" },
            { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["babel"] },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ["node_modules"]
    },
    externals: {
       "react": "react"
    },
    plugins: [
    	new webpack.DefinePlugin({
    	    'process.env': {
    		NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    	    }
    	}),
    ],
    devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false
};
