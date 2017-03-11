'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const ENV_HOST = process.env.HOST || 'localhost';
const ENV_PORT = (+process.env.PORT) || 8080;
// const ENV_HOST_API = process.env.HOST_API || 'localhost';
// const ENV_PORT_API = process.env.PORT_API || 3000;

const APP_DIRECTORY = 'src';
const BUILD_DIRECTORY = '.tmp';
const PATHS = {
  ROOT: path.join(__dirname, '..'),
  APP: path.join(__dirname, '..', APP_DIRECTORY),
  BUILD: path.join(__dirname, '..', BUILD_DIRECTORY)
};

module.exports = {
  devtool: 'source-map',
  context: PATHS.APP,
  entry: {
    bundle: [
      PATHS.APP,
      'webpack-dev-server/client?http://' + ENV_HOST + ':' + ENV_PORT,
      'webpack/hot/only-dev-server'
    ]
  },
  output: {
    path: PATHS.BUILD,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js',
    publicPath: 'http://' + ENV_HOST + ':' + ENV_PORT + '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', PATHS.APP]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin([BUILD_DIRECTORY], {root: PATHS.ROOT, verbose: true, dry: false}),
    new HtmlWebpackPlugin({template: path.join(PATHS.APP, 'index.html')}),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel', 'eslint-loader']
      },
      // {test: /\.html$/, loaders: ['html']},
      {test: /\.css$/, loaders: ['style', 'css?sourceMap']},
      {test: /\.styl$/, loaders: ['style', 'css?sourceMap', 'stylus?sourceMap']},
      {test: /\.less$/, loaders: ['style', 'css?sourceMap', 'less?sourceMap']},
      {test: /\/images\/.*\.(png|jpg|jpeg|gif|svg)$/, loader: 'file', query: {name: 'images/[name].[ext]'}},
      {test: /\/fonts\/.*\.(woff|woff2|svg|ttf|eot)(\?[\w=\.]+)?$/, loader: 'file', query: {name: 'fonts/[name].[ext]'}},
      {test: /\/favicon\//, loader: 'file', query: {name: 'favicon/[name].[ext]'}}
    ],
    postcss: [
      autoprefixer({
        browsers: ['last 2 versions', '> 5%']
      })
    ]
  },
  devServer: {
    host: ENV_HOST,
    port: ENV_PORT,
    hot: true,
    inline: true,
    historyApiFallback: true,
    proxy: []
  }
};
