const winston = require("winston");
require("winston-daily-rotate-file");
const expressWinston = require("express-winston");
const { format } = winston;

const infoLogger = expressWinston.logger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: "logs/combined/combined-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      colorize: true,
      maxSize: "20m",
      maxFiles: "14d",
      zippedArchive: true,
      prepend: true,
      utc: true,
    }),
  ],
});

const errorLogger = winston.createLogger({
  level: "error",
  format: format.combine(
    format.errors({ stack: true }),
    format.metadata(),
    format.json()
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: "logs/error/error-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      colorize: true,
      maxSize: "20m",
      maxFiles: "14d",
      zippedArchive: true,
      prepend: true,
      utc: true,
    }),
  ],
});

module.exports = {
  infoLogger,
  errorLogger,
};
