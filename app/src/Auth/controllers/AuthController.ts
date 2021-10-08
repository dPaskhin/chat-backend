import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from '@app/Auth/services/AuthService';
import { IJwtTokenDto } from '@app/Auth/dto/IJwtTokenDto';
import { CreateUserDto } from '@app/User/dto/CreateUserDto';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public register(@Body() body: CreateUserDto): Promise<IJwtTokenDto> {
    return this.authService.register(body);
  }
}
