const webpack = require('webpack');

module.exports.transpile = function transpile(src, destDirectory, destFilename) {
  const config = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
      main: `./${src}`,
    },
    output: {
      path: destDirectory,
      filename: destFilename,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: `${__dirname}/../node_modules/ts-loader`
        }
      ]
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
  })
}
