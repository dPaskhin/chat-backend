import { Global, Module } from '@nestjs/common';

import { SystemErrorFactory } from '@app/SystemError/factories/SystemErrorFactory';

@Global()
@Module({
  providers: [SystemErrorFactory],
  exports: [SystemErrorFactory],
})
export class SystemErrorModule {}
