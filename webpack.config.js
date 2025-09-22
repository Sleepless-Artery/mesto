const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: './src/index.js', 
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, 
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'], 
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|otf)$/, 
                type: 'asset/resource',
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            `...`, 
            new CssMinimizerPlugin(), 
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', 
            inject: true, 
        }),
    ],
    devtool: 'source-map', 
};