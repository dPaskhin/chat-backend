import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcryptjs';

import { UserService } from '@app/User/services/UserService';
import { IJwtTokenDto } from '@app/Auth/dto/IJwtTokenDto';
import { UserEntity } from '@app/User/entities/UserEntity';
import { CreateUserDto } from '@app/User/dto/CreateUserDto';

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

  private generateToken(user: UserEntity): IJwtTokenDto {
    return {
      token: this.jwtService.sign({ id: user.id, login: user.login }),
    };
  }
}
