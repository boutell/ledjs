import * as screen from './screen.js';
import { frame } from '../app.js';
import { performance } from 'perf_hooks';

go();

const fps = 60;

const seconds = 5;

// argv.seconds ? parseInt(argv.seconds) : false;

async function go() {
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
