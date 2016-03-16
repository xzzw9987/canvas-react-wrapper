var webpack = require('webpack');
var buildPath = require('path').resolve(__dirname, 'build');
module.exports = {
    entry: './src/main.js',
    output: {
        path: './build/',
        filename: 'bundle.js',

        /**
         * use hash
         * filename: [hash].bundle.js
         */

        /**
         * @important
         * publicPath
         * for code splitting
         */
        publicPath: './build/',
        chunkFilename: '[chunkhash].bundle.js'
        
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    stage: 0,
                    optional: ['runtime']
                }
            }]
    },
    watch: true
};
