import { Buffer } from 'node:buffer';

export const width = 64;
export const height = 32;

const display = Buffer.alloc(width * height * 3);

clear();

export function clear() {
  for (let y = 0; (y < height); y++) {
    for (let x = 0; (x < width); x++) {
      setRaw(x, y, 0, 0, 0);
    }  
  }
}

export function set(x, y, r, g, b) {
  if (!(componentInBounds(r) && componentInBounds(g) && componentInBounds(b))) {
    throw new Error(`Color component out of bounds: ${r}, ${g}, ${b}`);
  }
  x = Math.floor(x);
  y = Math.floor(y);
  if (!inBounds(x, y)) {
    throw new Error(`Out of bounds: ${x} ${y} (bounds are ${width} x ${height})`);
  }
  setRaw(x, y, r, g, b);
}

export function inBounds(x, y) {
  return !((x < 0) || (x >= width) || (y < 0) || (y >= height))
}

export function componentInBounds(v) {
  return (v >= 0) && (v <= 255);
}

export function draw() {
  process.stdout.write(display);
}

function setRaw(x, y, r, g, b) {
  let i = (y * width + x) * 3;
  display[i++] = r;
  display[i++] = g;
  display[i] = b;
}
