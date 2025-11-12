import TurtleFactory from '../lib/turtle.js';

let last = 0;

export function frame(tools, now) {
  const Turtle = TurtleFactory(tools);
  let second = Math.floor(now / 1000);
  if (second !== last) {
    tools.clear();
  }
  last = second;
  const random = seededRandom(second);
  const turtle = new Turtle({ x: tools.width / 2, y: tools.height - 1, a: 270, r: 150, g: 75, b: 0 });
  iterate(turtle, 12, 0);

  function iterate(turtle, length, step) {
    if (step === 4) {
      return;
    }
    turtle.forward(length);
    for (let a = -45; (a <= 45); a += 45) {
      const subTurtle = turtle.clone();
      subTurtle.r *= 1.1;
      subTurtle.g *= 0.8;
      subTurtle.b *= 1.0;
      subTurtle.a += (a + random() * 20);
      iterate(subTurtle, length * .7, step + 1);
    }
  }
}

function seededRandom(seed) {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;
  
  return function() {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}