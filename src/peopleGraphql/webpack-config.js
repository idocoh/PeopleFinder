var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    target:'node',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'backend.js'
    },
    /*plugins: [
        new webpack.BannerPlugin({banner: 'require("source-map-support").install();', raw: true, entryOnly: false })
    ],
    devtool: 'sourcemap',*/
    externals: nodeModules
};