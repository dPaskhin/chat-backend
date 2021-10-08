import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '@app/User/UserModule';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule],
})
export class AppModule {}
