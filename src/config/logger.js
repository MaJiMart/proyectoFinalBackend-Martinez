import winston from 'winston';

const customLevelOps = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'red',
    error: 'magenta',
    warning: 'yellow',
    info: 'blue',
    http: 'white',
    debug: 'cyan',
  },
};

export const logger = winston.createLogger({
  levels: customLevelOps.levels,
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOps.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: './records.log', level: 'debug' }),
  ],
});

export const addLogger = (req, res, next) => {
  req.logger = logger;
  next();
}; 