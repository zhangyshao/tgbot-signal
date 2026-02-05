import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { Observable, map } from "rxjs"
import { ResponseDataType, PrimitiveResponseData } from "../types/global"



@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, PrimitiveResponseData<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<PrimitiveResponseData<T>> {

    return next
      .handle()
      .pipe(
        map(data => {

          return new ResponseDataType(data)
        })
      )
  }
}