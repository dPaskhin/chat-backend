import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';

import { UserService } from '@app/User/services/UserService';
import { IJwtTokenDto } from '@app/Auth/dto/IJwtTokenDto';
import { UserEntity } from '@app/User/entities/UserEntity';
import { CreateUserDto } from '@app/User/dto/CreateUserDto';
import { LoginDto } from '@app/Auth/dto/LoginDto';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(dto: CreateUserDto): Promise<IJwtTokenDto> {
    const candidate = await this.userService.findByLogin(dto.login);

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким логином уже существует',
        HttpStatus.BAD_REQUEST,
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
      throw new UnauthorizedException({
        message: 'Некорректный логин или пароль',
      });
    }

    const isPasswordEquals = await compare(dto.password, candidate.password);

    if (!isPasswordEquals) {
      throw new UnauthorizedException({
        message: 'Некорректный логин или пароль',
      });
    }

    return this.generateToken(candidate);
  }

  private generateToken(user: UserEntity): IJwtTokenDto {
    return {
      token: this.jwtService.sign({ id: user.id, login: user.login }),
    };
  }
}
