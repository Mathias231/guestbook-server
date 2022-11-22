import express from 'express';
import session from 'express-session';
import passport from 'passport';
import connect, { createUser, findUser } from './lib/db';
import './middleware/passport';

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

// Set session cookie
app.use(
  session({
    name: 'token',
    secret: 'cat',
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 7,
      secure: true,
    },
  }),
);

// Main page (server side)
app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

// Create User
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // New (works)
  if (await findUser({ username })) {
    res.sendStatus(226);
  } else {
    createUser({ username, password });
    res.sendStatus(201);
  }
});

app.get('/loginError', (req, res) => {
  res.send("User doesn't exist");
});

app.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/loginError',
    failureFlash: true,
    failureMessage: true,
  }),
  function (req, res) {
    res.send('Successfully Authenticated');
  },
);

app.get('/user', (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log('Running at port: ' + port);
});
