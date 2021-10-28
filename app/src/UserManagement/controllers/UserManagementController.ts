import { Controller, Get, UseGuards } from '@nestjs/common';

import { UserService } from '@app/UserManagement/services/UserService';
import { UserEntity } from '@app/UserManagement/entities/UserEntity';
import { AuthGuard } from '@app/Common/guards/AuthGuard';

@Controller('user-management')
export class UserManagementController {
  public constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/users')
  public get(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }
}
