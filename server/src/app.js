/* -------------------------------- PACKAGES -------------------------------- */

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

/* -------------------------------------------------------------------------- */

import logger from './util/logger';

const app = express();

/* ------------------------------- MIDDLEWARES ------------------------------ */

app.use(morgan('combined', {stream: logger.stream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* -------------------------------------------------------------------------- */

/* ------------------------------- ROUTES ------------------------------ */

app.get('/', (req, res) => {
  res.send('Hello World!');
});

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
