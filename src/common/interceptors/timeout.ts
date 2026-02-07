import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException
} from "@nestjs/common";
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

    const requestType = context.getType()

    let timeOutMs = 30 * 1000

    switch (requestType) {

      case "http":
        if (context.switchToHttp().getRequest().method !== "POST") {

          timeOutMs = 10 * 1000
        }
        break
      case "ws":
        break
      default:
    }

    return next.handle()
      .pipe(
        timeout(timeOutMs),
        catchError(err => {

          if (err instanceof TimeoutError) {

            return throwError(() => new RequestTimeoutException())
          }

          return throwError(() => err)
        })
      )
  }
}