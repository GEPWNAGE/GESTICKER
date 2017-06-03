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
