import { WinstonModuleOptions } from 'nest-winston';
import * as path from 'path';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const { format, transports } = winston;

const baseLogPath = path.resolve(__dirname, '../../logs')

const logFormat = format.combine(
  format.timestamp(
    {
      format: () => new Date().toLocaleString(), // use local time
    }
  ),
  format.colorize(),
  format.align(),
  format.printf(
    ({ timestamp, level, message, stack }) =>
      `${timestamp} ${level}: ${message}${stack ? `\n${stack}` : ''}`,
  ),
);

const infoDailyRotateFileOptions = {
  dirname: `${baseLogPath}/info`,
  filename: '%DATE%.info.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d',
  level: 'info',
  debug: true, // Debugging
};

const errorDailyRotateFileOptions = {
  dirname: `${baseLogPath}/error`,
  filename: '%DATE%.error.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d',
  level: 'error',
  handleExceptions: true, // Capture uncaught exceptions
  debug: true, // Debugging
};


const WinstonConfig: WinstonModuleOptions = {
  format: logFormat,
  transports: [
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: format.combine(
        format.colorize(),
        format.simple(),
      ),
    }),
    new transports.DailyRotateFile(infoDailyRotateFileOptions),
    new transports.DailyRotateFile(errorDailyRotateFileOptions),
  ],
};

export const WinstonInstance = winston.createLogger(WinstonConfig)