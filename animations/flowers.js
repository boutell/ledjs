let lifetime = 1000 * 60;
let total;
let flowers;
let last;

export function frame({ clear, set, width, height }, now) {

  if ((!last) || (now - last > lifetime)) {
    total = Math.floor(Math.random() * 5 + 2);
    flowers = [];
    for (let f = 0; (f < total); f++) {
      const x = Math.random() * width;
      const y = height - 1;
      flowers.push({ x, y });
    }
  }

  for (const flower of flowers) {
    line(flower.x, flower.y, flower.x, flower.y - 10, 0, 255, 0);
  }

  last = now;

  function line(x1, y1, x2, y2, radius, r, g, b) {
    const x1t = Math.min(x1, x2);
    const x2t = Math.max(x1, x2);
    x1 = x1t;
    x2 = x2t;
    const y1t = Math.min(y1, y2);
    const y2t = Math.max(y1, y2);
    const steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    for (let i = 0; (i < steps); i++) {
      const x = x1 + (x2 - x1) * i / steps;
      const y = y1 + (y2 - y1) * i / steps;
      set(x, y, r, g, b);
    }
  }
}

