import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from '@app/Auth/services/AuthService';
import { IJwtTokenDto } from '@app/Auth/dto/IJwtTokenDto';
import { CreateUserDto } from '@app/UserManagement/dto/CreateUserDto';
import { LoginDto } from '@app/Auth/dto/LoginDto';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public register(@Body() body: CreateUserDto): Promise<IJwtTokenDto> {
    return this.authService.register(body);
  }

  @Post('/login')
  public login(@Body() body: LoginDto): Promise<IJwtTokenDto> {
    return this.authService.login(body);
  }
}
