const path = require('path');
const nodeExternals = require('webpack-node-externals');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'inline-source-map',
    target: 'node', // use require() & use NodeJs CommonJS style
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    externalsPresets: {
        node: true // in order to ignore built-in modules like path, fs, etc.
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js/,
                use: 'babel-loader',
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    plugins: [
        new InterpolateHtmlPlugin({'PUBLIC_URL': 'public'})
    ],
    devServer: {
        compress: true,
        hot: true,
        open: true,
        port: 3000,
        static: 'dist',
        historyApiFallback: true,
    },
};

