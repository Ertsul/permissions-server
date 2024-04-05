import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type CommonResponseType = {
  code: HttpStatus;
  message: string;
  data: any;
};

@Injectable()
/** 统一 response 接口响应数据结构 */
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(
        (data) =>
          ({
            code: HttpStatus.OK,
            message: 'Success',
            data,
          }) as CommonResponseType,
      ),
    );
  }
}
