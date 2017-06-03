const path = require('path');

const publicPath = path.resolve(__dirname, '../server/public');

const config = {
    context: __dirname,
    entry: [
        './src/index',
    ],
    output: {
        path: publicPath,
        filename: 'bundle.js',
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
        ],
    },
};

module.exports = config;
