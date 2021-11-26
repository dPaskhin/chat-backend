import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { SystemErrorFactory } from '@app/SystemError/factories/SystemErrorFactory';
import { AuthService } from '@app/Auth/services/AuthService';
import { ISocketWithUser } from '@app/Common/types/ISocketWithUser';

@Injectable()
export class WsAuthGuard implements CanActivate {
  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly authService: AuthService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<ISocketWithUser>();

    const authHeader = client.handshake.headers.authorization;

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

    client.user = authorizedUser;

    return true;
  }
}
