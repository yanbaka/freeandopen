const path = require('path');
const webpack = require('webpack');

const conf = require('../config');
const base = require('./base');

module.exports = {
  ...base,
  entry: Object.entries(base.entry).reduce((tmp, [key, value]) => {
    tmp[key] = [
      `webpack-dev-server/client?http://localhost:${conf.ports.webpackDevServer}`,
      'webpack/hot/only-dev-server',
      ...(value instanceof Array ? value : [value]),
    ];
    return tmp;
  }, {}),
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': "'development'" }),
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    publicPath: base.output.publicPath,
    contentBase: [path.join(process.cwd(), conf.dest.dev), path.join(process.cwd(), 'assets')],
    port: conf.ports.webpackDevServer,
  },
};
