/* eslint-disable no-undef */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
module.exports = function (env) {
    return {
        entry: {
            app: path.join(__dirname, '../src/', 'index.tsx')
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/i,
                    loader: 'babel-loader',
                    options: { cacheDirectory: true },
                    exclude: /node_modules/,
                },
                {
                    test: /\.(jpg|png|gif)$/,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 10 * 1024
                        }
                    },
                    generator: {
                        filename: 'img/[name].[hash:6][ext]',
                        publicPath: './'
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.join(__dirname, '..', 'index.html') }),
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(env)
            })
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            alias: {
                'src': path.join(__dirname, '../src')
            }
        }
    }
};