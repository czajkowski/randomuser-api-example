const path = require('path');

module.exports = async ({
    config,
}) => {

    config.module.rules.push({
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
                            path.resolve(__dirname, '../src/resources/styles'),
                        ],
                    },
                },
            },
        ],
        include: path.resolve(__dirname, '../'),
    });

    return config;
};