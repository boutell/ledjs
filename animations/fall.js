import TurtleFactory from '../lib/turtle.js';

export function frame(tools, now) {
  const Turtle = TurtleFactory(tools);
  const turtle = new Turtle({ x: tools.width / 2, y: tools.height - 1, a: 270 });
  iterate(turtle, 12, 0);
}

function iterate(turtle, length, step) {
  if (step === 4) {
    return;
  }
  turtle.forward(length);
  for (let a = -45; (a <= 45); a += 45) {
    const subTurtle = turtle.clone();
    subTurtle.a += a;
    iterate(subTurtle, length * .7, step + 1);
  }
}
