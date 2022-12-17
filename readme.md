# chrome-node

Run your NodeJS scripts in Chrome with ease!

## Installation

To install the CLI, simply run:

```
npm install -g chrome-node
```

## Usage

To use chrome-node, just call it with .ts file you want to run. You'll need a tsconfig file for that.
```
chrome-node runme.ts
```

You can also run .js files 
```
chrome-node runme.js
```

## puppeteer.json
If `puppeteer.json` exists in the directory from which `chrome-node` is called,
it's then sent to the puppeteer library internally.
Useful for switching browser or adding flags to it.

## Example

Here's an example of using chrome-node to run a simple script that logs "Hello, World!" to the console:

Just a regular node script which uses fetch (runme.js)
```
(async () => {
  const resp = await fetch('https://api.github.com/users/ikatun');
  console.log('response', await resp.text());
  process.exit(0);
})();
```

Rather than using node, you can now run it via chrome:
```
chrome-node runme.js
```

## Why?
WebRTC is not properly supported by NodeJS.
This tool allows for server side tools to easily use WebRTC.

Also, why not?
