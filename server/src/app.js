/* -------------------------------- PACKAGES -------------------------------- */

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import morgan from 'morgan';

/* -------------------------------------------------------------------------- */

import {logger} from './util/logger';
import {auth as authConfig} from '../config';
import setupAuthRoutes from './auth';

const app = express();

/* ------------------------------- MIDDLEWARES ------------------------------ */

// logging
app.use(morgan('combined', {stream: logger.stream}));
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// cookie parser
app.use(cookieParser());
// session for passport
app.use(session({
  secret: authConfig.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {secure:true},
}));
// passport initialize
app.use(passport.initialize());
app.use(passport.session()); 

/* -------------------------------------------------------------------------- */

/* ------------------------------- ROUTES ------------------------------ */

// test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// authentication routes
setupAuthRoutes(app);

/* -------------------------------------------------------------------------- */

/* ------------------------------ HANDLE ERRORS ----------------------------- */

app.use((err, req, res, next) => {
  console.error(err.stack);
  // res.status(500).send(err);
  // res.send(err);
  next();
});

/* -------------------------------------------------------------------------- */

export default app;
