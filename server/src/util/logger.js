import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      colorize: true,
      timestamp: true,
      prettyPrint: true,
      label: 'experts-server',
    }),
  ],
});

// create stream for morgan
logger.stream = {
  write: message => logger.info(message),
};

export default logger;
