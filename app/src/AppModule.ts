import { Module } from '@nestjs/common';
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
})
export class AppModule {}
