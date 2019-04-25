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
    title: 'Ticker - search app',
    description: 'Test stock ticker search app',
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
      extensions: ['.js', '.json', '.css', '.less'],
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
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: false
              }
            }
          ]
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: "[local]"
              }
            },
            {
              loader: "less-loader"
            }
            ]
        }
      ]
    }
  }
};
