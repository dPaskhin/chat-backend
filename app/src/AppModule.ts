import { Module } from '@nestjs/common';

import { AppController } from '@app/AppController';

@Module({
  controllers: [AppController],
})
export class AppModule {}
