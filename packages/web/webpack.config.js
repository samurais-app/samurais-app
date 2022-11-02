const { merge } = require('webpack-merge')
const devConfig = require('./config/webpack.dev');
const common = require('./config/webpack.common');
const prodConfig = require('./config/webpack.prod');

module.exports = (env) => {
  const _env = Object.keys(env).filter((i) => i !== 'WEBPACK_SERVE')[0]
  if(env.development) return merge(devConfig, common({ env:_env }));
  return merge(prodConfig, common({ env:_env }));
}