import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from 'src/modules/global/services/Logger';

interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {

  constructor(private readonly logger: LoggerService) { }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let errorMessage: string;

    const statusCode = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    errorMessage = `
      Exception occurred...
      Timestamp: ${new Date().toISOString()}
      statusCode: ${statusCode}
      Error Name: ${exception.name || exception.constructor.name}
      Path: ${request.url}
      Method: ${request.method}
      Error Message: ${exception.message || JSON.stringify(exception)}
      Stack Trace: ${exception.stack || 'No stack trace available'}
      `
    console.log(exception.constructor.name, '<=error name')
    this.logger.error(errorMessage);

    const errorResponse: ErrorResponse = {
      statusCode,
      message: errorMessage,
      path: request.url,
      timestamp: new Date().toLocaleString(),
    };

    response.status(statusCode).json(errorResponse);
  }
}