import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { IRequestWithUser } from '@app/Common/types/IRequestWithUser';

export const CurrentUserDecorator = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<IRequestWithUser>();

    return request.user;
  },
);
