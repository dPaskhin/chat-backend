import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from '@app/Auth/services/AuthService';
import { AuthController } from '@app/Auth/controllers/AuthController';
// eslint-disable-next-line import/no-cycle
import { UserModule } from '@app/User/UserModule';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
