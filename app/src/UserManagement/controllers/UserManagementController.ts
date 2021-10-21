import { Controller, Get } from '@nestjs/common';

import { UserService } from '@app/UserManagement/services/UserService';
import { UserEntity } from '@app/UserManagement/entities/UserEntity';

@Controller('user-management')
export class UserManagementController {
  public constructor(private readonly userService: UserService) {}

  @Get('/users')
  public get(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }
}
