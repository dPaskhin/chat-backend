import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SystemErrorFactory } from '@app/SystemError/factories/SystemErrorFactory';
import { IRequestWithUser } from '@app/Common/types/IRequestWithUser';
import { ITokenUser } from '@app/Auth/types/ITokenUser';
import { UserService } from '@app/UserManagement/services/UserService';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly userService: UserService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestWithUser>();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw this.systemErrorFactory.create(
        HttpStatus.UNAUTHORIZED,
        'Пользователь не авторизован',
      );
    }

    const [type, token] = authHeader.split(' ');

    const userId = (await this.jwtService.verifyAsync<ITokenUser>(token)).id;
    const authorizedUser = await this.userService.findById(userId);

    if (type !== 'Bearer' || !token || !authorizedUser) {
      throw this.systemErrorFactory.create(
        HttpStatus.UNAUTHORIZED,
        'Пользователь не авторизован',
      );
    }

    request.user = authorizedUser;

    return true;
  }
}
