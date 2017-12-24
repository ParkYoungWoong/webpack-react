var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
  entry: path.join(__dirname, '/src/js/index.js'),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'app.bundle.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ],
          publicPath: '/dist'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hello Webpack Project!',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      template: path.join(__dirname, '/src/index.ejs')
    }),
    new ExtractTextPlugin('app.css')
  ]
};