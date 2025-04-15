import express from 'express';
const app = express();
app.use((req, res, next) => {
  res.set('cache-control', 'no-cache');
  return next();
});
app.use(express.static('.'));
app.listen(3000);
console.log('listening on port 3000');