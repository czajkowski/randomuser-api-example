const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src/index.jsx'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }, {
            test: /\.scss$/,
            use: [
                "style-loader", {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                    },
                }, {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            includePaths: [
                                path.resolve(__dirname, './src/resources/styles'),
                            ],
                        },
                    }
                },
            ]
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: '.',
        },
    },
    devServer: {
        historyApiFallback: {
            index: 'index.html',
        }
    },
};