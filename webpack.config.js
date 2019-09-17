
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = env => {
  env = env || {};
  const config = {
    mode: env.mode || 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    resolveLoader: {
      alias: {
        "fix-polymer-imports": require.resolve("./tools/fix-polymer-imports.js")
      }
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: ['babel-loader', 'fix-polymer-imports']
        },
        { 
          test: /\.js/, 
          use: "fix-polymer-imports" 
        },
        {
          test: /polymer\.html$/,
          include: [
            path.resolve(__dirname, './node_modules/@banno/polymer')
          ]
        },
        {
          test: /\.js$/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: 'css-loader'
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: 'file-loader'
        }
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 1820

    },
    devtool: 'source-map',
    plugins: [
      new webpack.NormalModuleReplacementPlugin(
        /\/node_modules\/@banno\/polymer\/polymer\.html$/,
        '@banno/polymer/polymer-element.js'
      ),
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, './src/index.ejs'),
        alwaysWriteToDisk: true,
        inject: false,
        production: Boolean(env.release),
        filename: 'index.html'
      }),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, './node_modules/@webcomponents/webcomponentsjs/*.js'),
          to: './webcomponentsjs/[name].[ext]'
        },
        {
          from: path.resolve(__dirname, './src/assets/css/global.css'),
          to: './assets/css/global.css'
        }
      ]),
    ],
  };
  return config;
};