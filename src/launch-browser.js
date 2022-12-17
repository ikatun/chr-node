const puppeteer = require('puppeteer-core');
const fs = require('fs');

function getDefaultExecutablePath() {
  if (process.platform === 'darwin') {
    return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  }

  if (process.platform === 'linux') {
    return 'google-chrome';
  }

  const windowsPaths = [
    'C:\\Program Files (x86)\\Google\\Application',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application',
    'C:\\Program Files\\Google\\Chrome\\Application',
  ];

  return windowsPaths.find(p => fs.existsSync(p))
}

function serializeConsoleMessage(message) {
  const args = message.args();
  if (!args.length) {
    return [message.text()];
  }
  return Promise.all(args.map(m => m.jsonValue().catch(e => e)));
}

module.exports.launchBrowser = async function launchBrowser(url, opts = {}) {
  const browser = await puppeteer.launch({
    executablePath: getDefaultExecutablePath(),
    ...opts,
  });

  const page = (await browser.pages())[0];
  page.on('console', async message => {
    const args = await serializeConsoleMessage(message);
    if (args.length === 0) {
      return;
    }


    switch(message.type()) {
      case 'log':
        console.log(...args);
        break;
      case 'error':
        console.error(...args);
        break;
      case 'warning':
        console.warn(...args);
        break;
    }
  });

  page.on('error', error => {
    if (!error) {
      return;
    }
    console.error('error');
    console.error(error);
  });

  page.on('pageerror', error => {
    if (!error) {
      return;
    }
    console.error('pageerror');
    console.error(error);
  });

  await page.goto(url);
  const exitPromise = new Promise(async (resolve) => {
    await page.exposeFunction('exit', async (arg = 0) => {
      resolve(arg);
    });

    await page.evaluate(() => {
      if (!window.process) {
        window.process = {};
      }
      window.process.exit = window.exit;
      if (window.terminated) {
        window.process.exit();
      }
    })
  })

  return { page, browser, exitPromise };
}
