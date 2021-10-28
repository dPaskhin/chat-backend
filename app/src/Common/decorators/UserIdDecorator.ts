import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { IRequestWithUserId } from '@app/Common/types/IRequestWithUserId';

export const UserIdDecorator = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<IRequestWithUserId>();

    return request.userId;
  },
);
