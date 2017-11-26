var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {

    entry: {
        'vendor': './app/src/vendor.ts',
        'polyfills': './app/src/polyfills.ts',
        'app': './app/src/app.ts',
    },

    output: {
        path: __dirname + '/build/',
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        root: path.resolve('src/node_modules'),
        extensions: ['','.ts','.js','.css','.scss']
    },

    cache: true,
    devtool: 'source-map',

    module: {
        noParse: /node_modules\/json-schema\/lib\/validate\.js/,
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.scss$/,
                loaders: ["raw-loader", "sass"]
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.proto$/,
                loader: "proto-loader"
            }
        ]
    },

    plugins: [
        /* new CommonsChunkPlugin({ name: ['vendor', 'polyfills']}),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true, 
            cache: true, 
            warningsFilter: (source) => {
                console.log(source);
                return false;
            }
        }), */
        new webpack.DefinePlugin({
            $dirname: '__dirname',
        })
    ],

    target:'electron-renderer',

    node: {
        __dirname: false
    }
};
