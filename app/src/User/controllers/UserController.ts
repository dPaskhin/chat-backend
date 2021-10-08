import { Controller, Get } from '@nestjs/common';

import { UserService } from '@app/User/services/UserService';
import { UserEntity } from '@app/User/entities/UserEntity';

@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get()
  public get(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }
}
