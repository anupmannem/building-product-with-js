/* -------------------------------- PACKAGES -------------------------------- */

import app from './app';
import logger from './util/logger';

/* -------------------------------------------------------------------------- */

/* ------------------------------ start server ------------------------------ */

const port = 8080;

app.listen(port, () => {
  // const host = this.address().address;
  // const {port} = this.address().port;

  logger.info(`started listening at http://localhost:${port}`);
});

/* -------------------------------------------------------------------------- */

/* --------------------- output all uncaught exceptions --------------------- */

process.on('uncaughtException', (err) => {
  logger.error('uncaught exception:', err);
});
process.on('unhandledRejection', (error) => {
  logger.error('unhandled rejection:', error);
});

/* -------------------------------------------------------------------------- */
