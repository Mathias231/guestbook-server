import express from 'express';
import connect from './lib/db';

const app = express();
const port = process.env.PORT;

connect()

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log('Running');
});
