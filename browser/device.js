import * as screen from './screen.js';
const animation = await import(`/animations/${window.animation}.js`);
const canvas = document.getElementById('canvas');
requestAnimationFrame(driver);
function driver(now) {
  const ctx = document.getElementById("canvas").getContext("2d");
  animation.frame(screen, now);
  screen.draw(ctx);
  requestAnimationFrame(driver);
}
