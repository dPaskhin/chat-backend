import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SystemErrorFactory } from '@app/SystemError/factories/SystemErrorFactory';
import { IRequestWithUserId } from '@app/Common/types/IRequestWithUserId';
import { ITokenUser } from '@app/Auth/types/ITokenUser';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly systemErrorFactory: SystemErrorFactory,
  ) {}

  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<IRequestWithUserId>();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw this.systemErrorFactory.create(
        HttpStatus.UNAUTHORIZED,
        'Пользователь не авторизован',
      );
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw this.systemErrorFactory.create(
        HttpStatus.UNAUTHORIZED,
        'Пользователь не авторизован',
      );
    }

    request.userId = this.jwtService.verify<ITokenUser>(token).id;

    return true;
  }
}
