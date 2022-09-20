const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Compression = require('compression-webpack-plugin')

module.exports = {
  mode: 'production',
  output: {
    filename: 'scripts/[name].[contenthash].js',
    path: path.join(__dirname, '..', 'build'),
    publicPath:'/public/'
  },
  plugins: [
    new WebpackManifestPlugin({
      removeKeyHash: true,
      filter:(file) => !file.name.includes('html') && file.isInitial
    }),
    new Compression({
      filename:'[path][base].gz',
      algorithm: 'gzip',
      test:/\.(js|css)(\?.*)?$/i,
      threshold: 10240,
      minRatio: 0.8
    }),
    new CleanWebpackPlugin(),
  ]
}