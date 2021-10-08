import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from '@app/User/services/UserService';
import { UserRepository } from '@app/User/repositories/UserRepository';
import { UserController } from '@app/User/controllers/UserController';
// eslint-disable-next-line import/no-cycle
import { AuthModule } from '@app/Auth/AuthModule';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
