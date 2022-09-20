const { merge } = require('webpack-merge')
const devConfig = require('./config/webpack.dev');
const common = require('./config/webpack.common');
const prodConfig = require('./config/webpack.prod');

module.exports = (env) => {
  if(env.development) return merge(devConfig, common);
  return merge(prodConfig, common);
}