import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use((req, res, next) => {
  res.set('cache-control', 'no-cache');
  return next();
});
app.get('/', (req, res) => {
  res.set('content-type', 'text/html');
  const animations = fs.readdirSync(`${__dirname}/animations`).map(name => name.replace('.js', ''));
  return res.send(`<!DOCTYPE html>
    <html>
      <head>
        <title>LEDJS</title>
      </head>
      <body>
        <ul>
          ${animations.map(animation =>
            `<li><a href="/${animation}">${animation}`
          ).join('\n')}
        </ul>
      </body>
    </html>
` );
});

app.get('/:name', (req, res) => {
  const name = req.params.name;
  return res.send(`<!DOCTYPE html>
    <html>
      <head>
        <title>LEDJS: ${name}</title>
      </head>
      <body>
        <div id="fullscreen">
          <canvas id="canvas" width="64" height="32">
          </canvas>
        </div>
        <script>
          window.animation = '${name}';
        </script>
        <script src="/browser/device.js" type="module">
        </script>
        <style>
          body {
            margin: 0;
          }
          #fullscreen {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: black;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          #canvas {
            object-fit: contain;
            width: 100%;
            height: 100%;
            max-height: 100%;
            max-width: 100%;
          }
        </style>
      </body>
    </html>
  `);
});
app.use('/animations', express.static(`${__dirname}/animations`));
app.use('/browser', express.static(`${__dirname}/browser`));
app.listen(3000);
console.log('listening on port 3000');