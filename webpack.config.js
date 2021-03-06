var webpack = require('webpack');
// var path = require('path');    // IDEA: Use for Windows

module.exports = {
    entry: ['babel-polyfill', 'react-hot-loader/patch', './client/main.js'],
    output: {
        path: __dirname + '/public/build/js/', // IDEA: Use for linux
        // path: path.resolve(__dirname, '/public/build/js/'),   // IDEA: Use for Windows
        publicPath: 'build/js/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader'
                // exclude: [/node_modules/, /public/]
            },
            {
                test: /\.less$/,
                // loader: "style-loader!css-loader!autoprefixer-loader!less",
                loader:
                    'style-loader!css-loader!autoprefixer-loader!less-loader',
                exclude: [/node_modules/, /public/]
            },

            // Fonts loaders ======================================
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
                // loader: "url?limit=10000"
                use: 'url-loader'
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader'
            },
            // Fonts loaders ======================================

            {
                test: /\.gif$/,
                loader: 'url-loader?limit=10000&mimetype=image/gif'
            },
            {
                test: /\.jpg$/,
                loader: 'url-loader?limit=10000&mimetype=image/jpg'
            },
            {
                test: /\.png$/,
                loader: 'url-loader?limit=10000&mimetype=image/png'
            },
            {
                test: /\.svg/,
                loader: 'url-loader?limit=26000&mimetype=image/svg+xml'
            },
            {
                test: /\.jsx$/,
                // loader: 'react-hot-loader!babel-loader',
                loader: 'react-hot-loader/webpack!babel-loader',
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /bootstrap.+\.(jsx|js)$/,
                loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window'
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        hot: true
    }
    // plugins: [
    //     new webpack.NamedModulesPlugin(),
    //     new webpack.HotModuleReplacementPlugin()
    // ]
    // IDEA: If need jQuery for others stuff use this instead bootstrap loader
    // plugins:[
    //     new webpack.ProvidePlugin({
    //         jQuery: 'jquery',
    //         $: 'jquery',
    //         jquery: 'jquery'
    //     })
    // ]
};
