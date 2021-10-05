import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '@app/User/UserModule';
import { UserController } from '@app/User/controllers/UserController';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule],
  controllers: [UserController],
})
export class AppModule {}
