import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserManagementModule } from '@app/UserManagement/UserManagementModule';
import { ValidationErrorModule } from '@app/ValidationError/ValidationErrorModule';
import { AuthModule } from '@app/Auth/AuthModule';
import { ErrorFilterModule } from '@app/ErrorFilter/ErrorFilterModule';
import { SystemErrorModule } from '@app/SystemError/SystemErrorModule';
import { CommonModule } from '@app/Common/CommonModule';
import { ConfigModule } from '@app/Config/ConfigModule';
import { MessageManagementModule } from '@app/MessageManagement/MessageManagementModule';
import { RoomManagementModule } from '@app/RoomManagement/RoomManagementModule';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserManagementModule,
    ValidationErrorModule,
    AuthModule,
    ErrorFilterModule,
    SystemErrorModule,
    CommonModule,
    ConfigModule,
    MessageManagementModule,
    RoomManagementModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
