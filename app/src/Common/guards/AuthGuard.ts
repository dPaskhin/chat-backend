import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { SystemErrorFactory } from '@app/SystemError/factories/SystemErrorFactory';
import { IRequestWithUser } from '@app/Common/types/IRequestWithUser';
import { AuthService } from '@app/Auth/services/AuthService';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly authService: AuthService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestWithUser>();

    const authHeader = request.headers.authorization;

    const unAuthError = this.systemErrorFactory.create(
      HttpStatus.UNAUTHORIZED,
      'Пользователь не авторизован',
    );

    if (!authHeader) {
      throw unAuthError;
    }

    const authorizedUser = await this.authService.findUserFromAuthHeader(
      authHeader,
    );

    if (!authorizedUser) {
      throw unAuthError;
    }

    request.user = authorizedUser;

    return true;
  }
}
