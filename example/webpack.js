
'use strict'

const path = require('path')

module.exports = {
  entry: {
    index: path.join(__dirname, 'index.js'),
  },

  output: {
    path: path.join(__dirname, '../build'),
    filename: 'example.js'
  },

  module: {
    rules: [{
      test: /\.js/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      // exclude: /node_modules/
    }]
  },

  devtool: 'source-map'
}
