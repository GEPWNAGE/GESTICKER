const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

function baseConfig({ environment, devtool, analyze }) {
    const config = {
        context: __dirname,

        entry: [
            './src/index',
        ],

        output: {
            path: path.resolve(__dirname, '../server/public/build'),
            filename: 'bundle.js',
        },
        devtool: devtool,

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
            alias: {},
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {

                                presets: [
                                    '@babel/preset-env',
                                    '@babel/preset-react',
                                ],
                                plugins: [
                                    'react-hot-loader/babel',
                                ],
                            }
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                            },
                        },
                    ],
                },

                {
                    test: /\.jsx?$/,
                    include: /node_modules.react-icons/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env', { modules: false }],
                                    '@babel/preset-react',
                                ],
                                plugins: [
                                    'react-hot-loader/babel',
                                ],
                            },
                        },
                    ],
                },

                {
                    test: /\.{jpg|svg|png|gif}$/,
                    use: [
                        {loader: 'file-loader'},
                    ],
                },
            ],
        },

        plugins: [
            new ForkTsCheckerWebpackPlugin(),

            new webpack.WatchIgnorePlugin([
                /scss\.d\.ts$/,
            ]),

            new webpack.HotModuleReplacementPlugin(),

            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(environment),
            }),
        ],
    };

    if (analyze) {
        config.plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        }));
    }

    return config;
}

function developmentConfig(config, { devServer }) {
    config.plugins.push(new webpack.NamedModulesPlugin());

    // Styles
    config.module.rules.push({
        test: /\.scss$/,
        use: [
            { loader: 'style-loader' },
            {
                loader: 'css-loader',
                options: {
                    // namedExport: true,
                    modules: true,
                    // localIdentName: '[name]-[local]-[hash:base64:5]',
                    importLoaders: 1,
                },
            },
            { loader: 'sass-loader' },
        ],
    });

    // Dev server
    if (devServer) {
        config.entry.unshift('react-hot-loader/patch');
        config.entry.unshift('webpack-dev-server/client?http://localhost:8080');

        config.resolve.alias['react-dom'] = '@hot-loader/react-dom';

        config.devServer = {
            host: 'localhost',
            port: 8080,
            hot: true,
            overlay: true,
            publicPath: 'http://localhost:8080/build/',
            headers: { 'Access-Control-Allow-Origin': '*' },
        };

        config.output.publicPath = 'http://localhost:8080/build/';
    }

    return config;
}

function productionConfig(config) {
    config.output.publicPath = '/build/';

    // Styles
    const extractStyles = new ExtractTextPlugin({
        filename: '[name].css',
    });

    config.module.rules.push({
        test: /\.scss$/,
        use: extractStyles.extract([
            {
                loader: 'css-loader',
                options: {
                    namedExport: true,
                    modules: true,
                    localIdentName: '[name]-[local]-[hash:base64:5]',
                    importLoaders: 1,
                },
            },
            { loader: 'sass-loader' },
        ]),
    });

    config.plugins.push(extractStyles);

    // Optimize bundle
    config.plugins.push(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }));

    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: config.devtool !== false,
    }));

    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

    return config;
}

function config({
    environment = 'development',
    devServer = false,
    devtool = false,
    analyze = false,
} = {}) {
    const environmentConfig = environment === 'development' ? developmentConfig : productionConfig;

    const env = {
        environment,
        devServer,
        devtool,
        analyze,
    };

    return environmentConfig(baseConfig(env), env);
}

module.exports = config;
