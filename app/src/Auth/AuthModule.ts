/*
eslint
import/no-cycle: off,
*/
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from '@app/Auth/services/AuthService';
import { AuthController } from '@app/Auth/controllers/AuthController';
import { ConfigModule } from '@app/Config/ConfigModule';
import { ConfigService } from '@app/Config/services/ConfigService';
import { ConfigName } from '@app/Config/enums/ConfigName';
import { UserManagementModule } from '@app/UserManagement/UserManagementModule';

@Module({
  imports: [
    forwardRef(() => UserManagementModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get(ConfigName.JWT_SECRET),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
