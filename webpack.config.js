const path = require('path');
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: ['./src/js/main.js', './src/scss/main.scss', './src/css/theme-overrides.css'],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'main.css',
              outputPath: '../css',
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'theme-overrides.css',
              outputPath: '../css',
            }
          }
        ]
      },
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'js'),
  },
};