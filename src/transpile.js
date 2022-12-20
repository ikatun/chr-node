const webpack = require('webpack');
const NodeSourcePlugin = require('webpack-import-plugins').importWebpack4Plugins().node.NodeSourcePlugin;

console.log('NodeSourcePlugin', NodeSourcePlugin);

module.exports.transpile = function transpile(src, destDirectory, destFilename) {
  const config = {
    // plugins: [
    //   new NodeSourcePlugin('current')
    // ],
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
      main: `./${src}`,
    },
    output: {
      path: destDirectory,
      filename: destFilename,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: `${__dirname}/../node_modules/ts-loader`,
        },
      ],
    },
    node: {
      dns: 'mock',
      fs: 'empty',
      path: true,
      url: false
    }
  };

  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        reject(err);
        return;
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        console.error(info.errors);
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings);
      }
      resolve();
    });
  });
};
