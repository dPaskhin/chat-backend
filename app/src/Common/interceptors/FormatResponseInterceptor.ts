import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Request } from 'express';

import { ApiResponseFactory } from '@app/Common/factories/ApiResponseFactory';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  public constructor(private readonly apiResponseFactory: ApiResponseFactory) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();

    return next
      .handle()
      .pipe(
        map((payload) =>
          this.apiResponseFactory.create(payload, request.method),
        ),
      );
  }
}
