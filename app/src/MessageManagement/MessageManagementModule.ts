import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessageRepository } from '@app/MessageManagement/repositories/MessageRepository';
import { RoomManagementModule } from '@app/RoomManagement/RoomManagementModule';
import { MessageManagementController } from '@app/MessageManagement/controllers/MessageManagementController';
import { MessageService } from '@app/MessageManagement/services/MessageService';
import { AuthModule } from '@app/Auth/AuthModule';
import { MessageGateway } from '@app/MessageManagement/services/MessageGateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageRepository]),
    RoomManagementModule,
    AuthModule,
  ],
  controllers: [MessageManagementController],
  providers: [MessageService, MessageGateway],
})
export class MessageManagementModule {}
