import * as screen from './screen.js';
import { performance } from 'perf_hooks';
import boring from 'boring';

const argv = boring();

const fps = 60;

const seconds = argv.seconds ? parseInt(argv.seconds) : false;
const animation = argv._[0];
if (!animation) {
  console.error('The first argument must be an animation name');
  process.exit(1);
}

go();

async function go() {
  const { frame } = await import(`../animations/${animation}.js`);
  let last = false;
  const start = performance.now();
  while (true) {
    let now = performance.now();
    const wait = (last !== false) && ((1000 / fps) - (now - last));
    if (wait >= 0) {
      await pause(wait);
      now = performance.now();
    }
    frame(screen, now);
    last = now;
    screen.draw();
    if (seconds !== false) {
      if (seconds * 1000 < (now - start)) {
        break;
      }
    }
  }
}

function pause(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}
