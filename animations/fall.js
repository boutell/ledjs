export function frame({ clear, set, width, height }, now) {
  const cx = width / 2;
  const cy = height / 2;
  let r = cy * 2 - 2;
  // for (let r = 0; (r < cy * 2); r+=3) {
    for (let d = 0; (d < 360); d += 10) {
      const x = Math.cos(d * Math.PI / 180) * r;
      const y = r;
      const z = Math.sin(d * Math.PI / 180) * r + (cy * 2);
      const sx = x / z + cx;
      const sy = y / z + cy;
      set(sx, sy, 0xff, 0x74, 0x17);
      const y2 = -r;
      const sy2 = y2 / z + cy;
      set(sx, sy2, 0xff, 0x74, 0x17);
    }
  // }
}
