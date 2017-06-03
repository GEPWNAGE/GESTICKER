const path = require('path');

const config = {
    context: __dirname,
    entry: [
        './src/index',
    ],

    output: {
        path: path.resolve(__dirname, '../server/public/build'),
        filename: 'bundle.js',
    },
    devServer: {
        publicPath: '/build/',
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    { loader: 'awesome-typescript-loader' },
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
                            importLoaders: 1,
                        },
                    },
                    { loader: 'sass-loader' },
                ],
            },
        ],
    },
};

module.exports = config;
