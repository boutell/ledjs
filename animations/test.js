export function frame({ clear, set, width, height }, now) {
  const d = (now / 1000 * 360) % 360;
  let x = width / 2;
  let y = height / 2;
  let dx = Math.cos(d * (Math.PI / 180));
  let dy = Math.sin(d * (Math.PI / 180));
  clear();
  for (let i = 0; (i < Math.min(width / 2, height / 2)); i++) {
    set(x, y, 255, 255, 255);
    x += dx;
    y += dy;
  }
  set(0, 0, 255, 0, 0);
  set(width - 1, height - 1, 0, 255, 0);
}
