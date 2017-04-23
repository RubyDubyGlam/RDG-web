var path = require('path');
var webpack = require('webpack');

const api_host = process.env.RDG_API_HOST || 'https://rdglam-dev.herokuapp.com'
// const api_proxy_url = api_protocol + '://' + api_host + '/'

module.exports = {
  entry: './client/index.js',
  output: {
    path: __dirname,
    filename: '/public/js/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets:["es2015", "react", "stage-0"]
        }
      }
    ]
  },
  devServer: {
    publicPath: "/",
    contentBase: "./public",
    hot: true,
    proxy: {
      '/v1': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        pathRewrite: {"^/v1" : ""}
      }
    },
  }
};

