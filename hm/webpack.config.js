const path = require('path'),
    webpack = require('webpack'),
    MinifyPlugin = require("uglifyjs-webpack-plugin"),
    GenerateHtmlPlugin = require('html-webpack-plugin'),
    context = `${__dirname}`,
    pluginList = [],
    devBuild = process.argv.indexOf('--dev') !== -1;

console.log('dev build = '+ devBuild);

module.exports = (env) => {
  !devBuild && pluginList.push(new MinifyPlugin());
  pluginList.push(new GenerateHtmlPlugin({
    title: 'HM - search app',
    description: 'Test search app for HM',
    template: './src/index.html',
    filename: './index.html',
    hash: !devBuild,
    inject: 'head'
  }));

  return {

    context: context,
    entry: {
       app_bundle: './src/com/Factory.js'
    },
    watch: devBuild,
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'build')
    },
    resolve: {
      extensions: ['.js', '.json', '.css'],
    },
    plugins: pluginList,
    mode: 'production',

    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader"
        },
        {
          test: /(\.js|\.css|\.less|.\scss)$/,
          exclude: /(node_modules)\//,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader' ]
        }
      ]
    }
  }
};
