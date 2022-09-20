const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    output: {
        filename: 'js/[name].js',
        path: path.join(__dirname, '..', 'build'),
        publicPath:'/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host: '0.0.0.0',
        port: '8082',
        compress: true,  
        bonjour: true,
        liveReload: true,             
        open: true,                   
        hot: true,
        client: {
            progress: true,
            logging: 'info',
        },
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, '../build'),
            publicPath: './',
            serveIndex: true,
        },
    }
};