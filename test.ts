import * as stream from 'stream';

export function testFunction(a: string, b: string) {
  console.log('a', a, 'b', b);
}

(async () => {
  testFunction('test', 'test again');
  // await fetch('https://api.github.com/users/ikatun');
  // throw new Error('this is an error');

  // process.exit();

  // console.log('process', process.exit());
  console.log('stream.Transform', Object.keys(stream));
  console.log('process', process.exit(0));
})();
