const path = require('path');

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'js/bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(path.join(__dirname, 'node_modules'))]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9900
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader']
            }
        ]
    }
};
