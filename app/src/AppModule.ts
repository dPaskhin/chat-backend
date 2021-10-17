import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '@app/User/UserModule';
import { ValidationErrorModule } from '@app/ValidationError/ValidationErrorModule';
import { AuthModule } from '@app/Auth/AuthModule';
import { ErrorFilterModule } from '@app/ErrorFilter/ErrorFilterModule';
import { SystemErrorModule } from '@app/SystemError/SystemErrorModule';
import { CommonModule } from '@app/Common/CommonModule';
import { ConfigModule } from '@app/Config/ConfigModule';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    ValidationErrorModule,
    AuthModule,
    ErrorFilterModule,
    SystemErrorModule,
    CommonModule,
    ConfigModule,
  ],
})
export class AppModule {}
