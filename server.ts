import express from 'express';
import connect, { createUser } from './lib/db';

var bodyParser = require('body-parser');
var cors = require('cors');

const port = process.env.PORT;
connect();

const app = express();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json());

// Main page (server side)
app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

// Create user
app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(username, password);
  createUser({ username, password });

  res.sendStatus(200);
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.username;

  console.log(username, password);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log('Running at port: ' + port);
});
