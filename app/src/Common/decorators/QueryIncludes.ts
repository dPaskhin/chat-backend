import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

const INCLUDE_QUERY = 'include';

export const QueryIncludes = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const include = request.query[INCLUDE_QUERY];

    if (!include || typeof include !== 'string') {
      return [];
    }

    return include.split(',');
  },
);
