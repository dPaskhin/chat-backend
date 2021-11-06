import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { UserService } from '@app/UserManagement/services/UserService';
import { UserEntity } from '@app/UserManagement/entities/UserEntity';
import { AuthGuard } from '@app/Common/guards/AuthGuard';
import { GetUserFilterDto } from '@app/UserManagement/dto/GetUserFilterDto';

@Controller('user-management')
export class UserManagementController {
  public constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/users')
  public get(
    @Query('filter') filter?: GetUserFilterDto,
  ): Promise<UserEntity[]> {
    return this.userService.get(filter);
  }
}
