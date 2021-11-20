import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Socket } from 'socket.io';

import { SystemErrorFactory } from '@app/SystemError/factories/SystemErrorFactory';
import { AuthService } from '@app/Auth/services/AuthService';

@Injectable()
export class WsAuthGuard implements CanActivate {
  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly authService: AuthService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<Socket>();

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

    return true;
  }
}
