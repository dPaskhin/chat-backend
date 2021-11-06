import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ParticipantRepository } from '@app/RoomManagement/repositories/ParticipantRepository';
import { RoomRepository } from '@app/RoomManagement/repositories/RoomRepository';
import { RoomService } from '@app/RoomManagement/services/RoomService';
import { RoomManagementController } from '@app/RoomManagement/controllers/RoomManagementController';
import { ParticipantService } from '@app/RoomManagement/services/ParticipantService';
import { AuthModule } from '@app/Auth/AuthModule';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParticipantRepository, RoomRepository]),
    AuthModule,
  ],
  providers: [RoomService, ParticipantService],
  controllers: [RoomManagementController],
  exports: [ParticipantService],
})
export class RoomManagementModule {}
