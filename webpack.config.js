'use strict';

let webpack = require('webpack');
let path = require('path');
let isProduction = process.argv.indexOf('--production') > -1;
let packageJSON = require('./package.json');

let webpackConfig = {
  context: path.join(__dirname, 'lib/'),

  entry: {
    [packageJSON.name]: './index.js'
  },

  output: {
    libraryTarget: 'umd',
    path: path.join(__dirname, '/dist'),
    filename: `[name]${ isProduction ? '.min' : '' }.js`
  },

  devtool: 'source-map',

  devServer: {
    stats: 'none'
  },

  externals: [
    {
      'react': {
        amd: 'react',
        commonjs: 'react'
      }
    },
    {
      'react-dom': {
        amd: 'react-dom',
        commonjs: 'react-dom'
      }
    }
  ],

  module: {
    loaders: [
    ]
  },

  plugins: [
     //  new WebpackNotifierPlugin()
  ]
};

if (isProduction) {
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
      warnings: false
    }
  }));
}

module.exports = webpackConfig;