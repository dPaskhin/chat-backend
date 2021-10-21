import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessageRepository } from '@app/Message/repositories/MessageRepository';

@Module({
  imports: [TypeOrmModule.forFeature([MessageRepository])],
})
export class MessageModule {}
