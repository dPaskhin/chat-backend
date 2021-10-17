import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from '@app/Auth/services/AuthService';
import { AuthController } from '@app/Auth/controllers/AuthController';
// eslint-disable-next-line import/no-cycle
import { UserModule } from '@app/User/UserModule';
import { ConfigModule } from '@app/Config/ConfigModule';
import { ConfigService } from '@app/Config/services/ConfigService';
import { ConfigName } from '@app/Config/enums/ConfigName';

@Module({
  imports: [
    forwardRef(() => UserModule),
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
  exports: [JwtModule],
})
export class AuthModule {}
