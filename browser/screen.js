export const width = 64;
export const height = 32;

const display = [];

for (let y = 0; (y < height); y++) {
  display[y] = [];
}

clear();

export function clear() {
  for (let y = 0; (y < height); y++) {
    for (let x = 0; (x < width); x++) {
      display[y][x] = `rgb(0, 0, 0)`;
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
  display[y][x] = `rgb(${r},${g},${b})`;
}

export function line(x1, y1, x2, y2, r, g, b) {
  const max = Math.max(Math.abs(y2 - y1), Math.abs(x - x1));
  for (let i = 0; i <= max; i++) {
    const x = (x2 - x1) / max * i;
    const y = (y2 - y1) / max * i;
    set(x, y, r, g, b);
  }
}

export function inBounds(x, y) {
  return !((x < 0) || (x >= width) || (y < 0) || (y >= height))
}

export function componentInBounds(v) {
  return (v >= 0) && (v <= 255);
}

export function draw(ctx) {
  ctx.strokeStyle = `rgb(255, 0, 0)`;
  ctx.beginPath(); // Start a new path
  ctx.rect(0, 0, width, height); // Add a rectangle to the current path
  ctx.stroke(); // Render the path
  for (let y = 0; (y < height); y++) {
    for (let x = 0; (x < width); x++) {
      ctx.fillStyle = display[y][x];
      ctx.fillRect(x, y, 1, 1);
    }
  }
}
