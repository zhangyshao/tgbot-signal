import { Injectable } from "@nestjs/common";
import * as winston from 'winston';
import { WinstonInstance } from "src/common/config/winston";
import { FormatErrorDetails } from "src/common/utils/str";

@Injectable()
export class LoggerService {

  private readonly logger: winston.Logger

  constructor() {

    this.logger = WinstonInstance
  }

  static winstonInstance() {

    return WinstonInstance
  }

  error(error: unknown, msg?: string) {

    const { stack, trace, cause } = error as any
    const errorMsg = msg || FormatErrorDetails(error)

    this.logger.error(errorMsg, { stack: trace || cause?.stack || stack })
  }

  info(error: unknown, msg?: string) {

    const { stack, trace, cause } = error as any
    const errorMsg = msg || FormatErrorDetails(error)

    this.logger.info(errorMsg, { stack: trace || cause?.stack || stack })
  }

  warn(error: unknown, msg?: string) {

    const { stack, trace, cause } = error as any
    const errorMsg = msg || FormatErrorDetails(error)

    this.logger.warn(errorMsg, { stack: trace || cause?.stack || stack })
  }

  debug(error: unknown, msg?: string) {

    const { stack, trace, cause } = error as any
    const errorMsg = msg || FormatErrorDetails(error)

    this.logger.debug(errorMsg, { stack: trace || cause?.stack || stack })
  }
}