const { resolve } = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");



module.exports = {
    entry: resolve(__dirname, 'js', 'main.js'),
    output: {
        filename: 'main.[contenthash].js',
        path: resolve(__dirname, 'build')
    },

    module: {
        rules: [ 
            {
            test: /\.s[ac]ss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.mp3$/,
                loader: 'file-loader',
                options: {
                    name: "[name].[ext]",
                    context: resolve(__dirname, 'build'),
                }
                
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: resolve(__dirname, 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new BundleAnalyzerPlugin(),
    ]
}