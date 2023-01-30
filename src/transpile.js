const  { build } = require("esbuild");
const { polyfillNode } = require("esbuild-plugin-polyfill-node");
const alias = require('esbuild-plugin-alias');
const path = require('path');

module.exports.transpile = async function transpile(src, destDirectory, destFilename) {
  await build({
    inject: [path.join(__dirname, 'process-shim.js')],
    define: {
      'process.argv': JSON.stringify(process.argv),
      'process.env': JSON.stringify(process.env),
    },
    entryPoints: [src],
    bundle: true,
    outfile: path.join(destDirectory, destFilename),
    target: 'chrome109',
    plugins: [
      polyfillNode({ globals: { process: true }, polyfills: { net: 'empty', inherits: false, stream: true, crypto: true } }),
    ],
  });
}
