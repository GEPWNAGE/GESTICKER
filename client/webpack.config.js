const path = require('path');
const webpack = require('webpack');

const config = {
    context: __dirname,
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        './src/index',
    ],

    output: {
        path: path.resolve(__dirname, '../server/public/build'),
        filename: 'bundle.js',
        publicPath: '/build/',
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        hot: true,
        publicPath: 'http://localhost:8080/build/',
        headers: { 'Access-Control-Allow-Origin': '*' },
    },
    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            useBabel: true,
                            babelOptions: {
                                presets: [
                                    'react',
                                ],
                                plugins: [
                                    'react-hot-loader/babel',
                                ],
                            },
                        },
                    },
                ],
            },

            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            namedExport: true,
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                            importLoaders: 1,
                        },
                    },
                    { loader: 'sass-loader' },
                ],
            },
        ],
    },

    plugins: [
        new webpack.WatchIgnorePlugin([
            /scss\.d\.ts$/,
        ]),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
};

module.exports = config;
