const aToR = Math.PI * 2 / 360;

export default function({ width, height, set }) {
  return class Turtle {
    constructor({ x = width / 2, y = height / 2, a = 0, r = 255, g = 255, b = 255 } = {}) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
      this.draw = true;
    }
    clone() {
      return new Turtle(this);
    }
    draw(flag) {
      this.draw = flag;
    }
    forward(n) {
      let x = this.x + Math.cos(aToR * this.a) * n;
      let y = this.y + Math.sin(aToR * this.a) * n;
      // Turtles wrap around. Can't use % for this with negative numbers
      while (x < 0) {
        x += width;
      }
      while (x >= width) {
        x -= width;
      }
      while (y < 0) {
        y += height;
      }
      while (y >= height) {
        y -= height;
      }
      if (this.draw) {
        this.line(this.x, this.y, x, y, this.r, this.g, this.b);
      }
      this.x = x;
      this.y = y;
    }
    line(x1, y1, x2, y2, r, g, b) {
      const dX = x2 - x1;
      const dY = y2 - y1;
      const maxX = Math.abs(dX);
      const maxY = Math.abs(dY);
      const max = Math.max(maxX, maxY);
      for (let i = 0; i <= max; i++) {
        const x = i * dX / max + x1;
        const y = i * dY / max + y1;
        set(x, y, r, g, b);
      }
    }
  };
}
