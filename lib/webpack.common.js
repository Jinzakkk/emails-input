const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.ts?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    mainFields: ['es2015', 'module', 'main'],
  },
  output: {
    filename: 'emails-input.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
