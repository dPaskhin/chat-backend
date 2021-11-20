import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from '@app/UserManagement/services/UserService';
import { UserRepository } from '@app/UserManagement/repositories/UserRepository';
import { UserManagementController } from '@app/UserManagement/controllers/UserManagementController';
// eslint-disable-next-line import/no-cycle
import { AuthModule } from '@app/Auth/AuthModule';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserService],
  controllers: [UserManagementController],
  exports: [UserService],
})
export class UserManagementModule {}
