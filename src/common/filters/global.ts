import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from 'src/modules/global/services/Logger';
import { ErrorResponse } from '../types/global';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {

  constructor(private readonly logger: LoggerService) { }

  catch(exception: any, host: ArgumentsHost) {

    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const statusCode = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage = `
      Exception occurred...
      TimestampISO: ${new Date().toISOString()}
      statusCode: ${statusCode}
      Error Name: ${exception.name || exception.constructor.name}
      Path: ${request.url}
      Method: ${request.method}
      Error Message: ${exception.message || "No message available"}
      `

    this.logger.error(errorMessage, exception);

    const errorResponse: ErrorResponse = {
      statusCode,
      message: errorMessage,
      path: request.url,
      timestamp: new Date().toLocaleString(),
    };

    response.status(statusCode).json(errorResponse);
  }
}