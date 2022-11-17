import express from 'express';
import session from 'express-session';
import passport from 'passport';
import connect, { createUser, findUserAndCreateUser } from './lib/db';
import './middleware/passport';
import userModel from './models/user.model';

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

// Create user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (!findUserAndCreateUser({ username, password })) {
    res.sendStatus(201);
  } else {
    res.sendStatus(226);
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
    console.log(req.body);
    res.send('Successfully Authenticated ' + req.session);
  },
);

app.get('/user', (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log('Running at port: ' + port);
});
