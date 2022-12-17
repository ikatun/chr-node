# chr-node

Run your NodeJS scripts in Chrome with ease!

## Installation

To install the CLI, simply run:

```
npm install -g chr-node
```

## Usage

To use chr-node, just call it with .ts file you want to run. You'll need a tsconfig file for that.
```
chr-node runme.ts
```

You can also run .js files 
```
chr-node runme.js
```

## puppeteer.json
If `puppeteer.json` exists in the directory from which `chr-node` is called,
it's then sent to the puppeteer library internally.
Useful for switching browser or adding flags to it.

## Example

Here's an example of using chr-node to run a simple script that `fetch()`es my github profile info:

Just a regular node script which uses fetch (runme.js)
```
(async () => {
  const resp = await fetch('https://api.github.com/users/ikatun');
  console.log('response', await resp.text());
  process.exit(0);
})();
```

## NOTE
Command process.exit() is needed to end the program.
Otherwise, it just keeps running indefinitely.

Rather than using node, you can now run it via chrome:
```
chr-node runme.js
```

## Why?
WebRTC is not properly supported by NodeJS.
This tool allows for server side tools to easily use WebRTC.

Also, why not?
