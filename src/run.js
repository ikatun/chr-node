#!/usr/bin/env node

const os = require("os");
const path = require('path');

const {transpile} = require("./transpile");
const {createServer} = require("./create-server");
const {launchBrowser} = require("./launch-browser");
const fs = require('fs');
const [node, script, src] = process.argv;

if (!src) {
  console.error('node-chrome <src>');
  process.exit(-1);
}

(async () => {
  const destDir = fs.mkdtempSync(path.join(os.tmpdir(), 'node-chrome'));

  await transpile(src, path.join(destDir, 'public'), 'main.js');
  const server = await createServer('public', destDir, 'main.js');
  const { exitPromise, browser } = await launchBrowser(`http://localhost:${server.port}`);
  await exitPromise;
  await browser.close();
  await server.close();
  fs.rmSync(destDir, { recursive: true, force: true });
})().catch((error) => {
  console.error(error);
  process.exit(-1);
});
