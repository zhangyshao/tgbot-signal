import { Injectable } from "@nestjs/common";
import * as winston from 'winston';
import { WinstonInstance } from "src/common/config/winston";

@Injectable()
export class LoggerService {

  private readonly logger: winston.Logger

  constructor() {

    this.logger = WinstonInstance
  }

  static winstonInstance() {

    return WinstonInstance
  }

  error<T>(msg: string, error?: T) {

    let stack;

    if (error && typeof error === "object") {

      const { stack: errStack, trace, cause } = error as any
      stack = trace || cause?.stack || errStack
    }

    this.logger.error(msg, { stack })
  }

  info<T>(msg: string, info?: T) {

    let stack;

    if (info && typeof info === "object") {

      const { stack: errStack, trace, cause } = info as any
      stack = trace || cause?.stack || errStack
    }

    this.logger.info(msg, { stack })
  }


  warn<T>(msg: string, warn?: T) {

    let stack;

    if (warn && typeof warn === "object") {

      const { stack: errStack, trace, cause } = warn as any
      stack = trace || cause?.stack || errStack
    }

    this.logger.warn(msg, { stack })
  }

  debug<T>(msg: string, debug?: T) {

    let stack;

    if (debug && typeof debug === "object") {

      const { stack: errStack, trace, cause } = debug as any
      stack = trace || cause?.stack || errStack
    }

    this.logger.debug(msg, { stack })
  }
}