'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const packageJson = require('../package.json');

const APP_DIRECTORY = 'src';
const BUILD_DIRECTORY = 'dist';
const PATHS = {
  ROOT: path.join(__dirname, '..'),
  APP: path.join(__dirname, '..', APP_DIRECTORY),
  BUILD: path.join(__dirname, '..', BUILD_DIRECTORY)
};

module.exports = {
  devtool: null,
  context: PATHS.APP,
  entry: {
    bundle: PATHS.APP,
    vendor: Object.keys(packageJson.dependencies)
  },
  output: {
    path: PATHS.BUILD,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', PATHS.APP]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new CleanWebpackPlugin([BUILD_DIRECTORY], {root: PATHS.ROOT, verbose: true, dry: false}),
    new HtmlWebpackPlugin({template: path.join(PATHS.APP, 'index.html')}),
    new webpack.optimize.CommonsChunkPlugin('vendor', '[name]-[chunkhash].js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({mangle: true, compress: {warnings: false}, output: {comments: false}}),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')},
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel', 'eslint-loader']
      },
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      {test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less')},
      {test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus')},
      {test: /\/images\/.*\.(png|jpg|jpeg|gif|svg)$/, loader: 'file', query: {name: 'images/[name].[ext]'}},
      {test: /\/fonts\/.*\.(woff|woff2|svg|ttf|eot)(\?[\w=\.]+)?$/, loader: 'file', query: {name: 'fonts/[name].[ext]'}},
      {test: /\/favicon\//, loader: 'file', query: {name: 'favicon/[name].[ext]'}}
    ],
    postcss: [
      autoprefixer({
        browsers: ['last 2 versions', '> 5%']
      })
    ]
  }
};
