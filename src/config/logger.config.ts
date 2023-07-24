import { injectable } from 'inversify';
import { format, createLogger, transports, LogCallback } from 'winston';

const { colorize, combine, label, printf, timestamp } = format;

@injectable()
export class Logger {
  private logger = createLogger({
    level: 'debug',
    format: combine(
      label({ label: '[LOGGER]' }),
      timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss',
      }),
      colorize({
        all: true,
        colors: {
          info: 'bold blue', // fontStyle color
          warn: 'italic yellow',
          error: 'bold red',
          debug: 'green',
        },
      }),
      printf(function (info) {
        return `\x1B[33m\x1B[3[${info.label}\x1B[23m\x1B[39m \x1B[32m${info.timestamp}\x1B[39m ${info.level} : ${info.message}`;
      })
    ),
    transports: [new transports.Console()],
  });

  public info(message: any, callback?: LogCallback) {
    this.logger.info(message, callback);
  }

  public warn(message: any, callback?: LogCallback) {
    this.logger.warn(message, callback);
  }

  public error(message: any, callback?: LogCallback) {
    this.logger.error(message, callback);
  }

  public debug(message: any, callback?: LogCallback) {
    this.logger.debug(message, callback);
  }
}
