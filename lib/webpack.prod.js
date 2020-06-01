const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  common.module.rules[0].use.unshift(MiniCssExtractPlugin.loader);

  return merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'emails-input.css',
      }),
    ],
  });
};
