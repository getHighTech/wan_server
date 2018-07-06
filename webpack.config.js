const HtmlWebPackPlugin = require("html-webpack-plugin");

require("babel-core/register");
require("babel-polyfill");

module.exports = {
  entry: ['babel-polyfill', "./src/client/index.js"],
  output: {
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
      
    ]
  },
  devServer: {
    compress: false,
    port: 9000,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:1234',
        pathRewrite: {'^/api/v1' : ''}
      }
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/index.html",
      minify: true,
    })
  ]
};