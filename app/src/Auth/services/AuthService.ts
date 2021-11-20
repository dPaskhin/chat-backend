import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';

import { UserService } from '@app/UserManagement/services/UserService';
import { IJwtTokenDto } from '@app/Auth/dto/IJwtTokenDto';
import { UserEntity } from '@app/UserManagement/entities/UserEntity';
import { CreateUserDto } from '@app/UserManagement/dto/CreateUserDto';
import { LoginDto } from '@app/Auth/dto/LoginDto';
import { SystemErrorFactory } from '@app/SystemError/factories/SystemErrorFactory';
import { ITokenUser } from '@app/Auth/types/ITokenUser';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly systemErrorFactory: SystemErrorFactory,
  ) {}

  public async register(dto: CreateUserDto): Promise<IJwtTokenDto> {
    const candidate = await this.userService.findByLogin(dto.login);

    if (candidate) {
      throw this.systemErrorFactory.create(
        HttpStatus.BAD_REQUEST,
        'Пользователь с таким логином уже существует',
      );
    }

    const hashedPassword = await hash(dto.password, 5);
    const user = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });

    return this.generateToken(user);
  }

  public async login(dto: LoginDto): Promise<IJwtTokenDto> {
    const candidate = await this.userService.findByLogin(dto.login);

    if (!candidate) {
      throw this.systemErrorFactory.create(
        HttpStatus.UNAUTHORIZED,
        'Некорректный логин или пароль',
      );
    }

    const isPasswordEquals = await compare(dto.password, candidate.password);

    if (!isPasswordEquals) {
      throw this.systemErrorFactory.create(
        HttpStatus.UNAUTHORIZED,
        'Некорректный логин или пароль',
      );
    }

    return this.generateToken(candidate);
  }

  private generateToken(user: UserEntity): IJwtTokenDto {
    return {
      token: this.jwtService.sign({
        id: user.id,
        login: user.login,
      } as ITokenUser),
    };
  }

  public async findUserFromAuthHeader(
    authHeader: string,
  ): Promise<UserEntity | void> {
    const [type, token] = authHeader.split(' ');

    const userId = (await this.jwtService.verifyAsync<ITokenUser>(token)).id;
    const authorizedUser = await this.userService.findById(userId);

    if (type !== 'Bearer' || !token || !authorizedUser) {
      return undefined;
    }

    return authorizedUser;
  }
}
