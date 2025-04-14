import * as screen from './screen.js';
import { frame } from './app.js';
const canvas = document.getElementById('canvas');

requestAnimationFrame(driver);
function driver(now) {
  const ctx = document.getElementById("canvas").getContext("2d");
  frame(screen, now);
  screen.draw(ctx);
  requestAnimationFrame(driver);
}
