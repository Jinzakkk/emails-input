const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = () => {
  common.module.rules[0].use.unshift('style-loader');

  return merge(common, {
    mode: 'development',
    devServer: {
      contentBase: './dist'
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, '..', 'demo', 'index.html')
      })
    ]
  });
};
