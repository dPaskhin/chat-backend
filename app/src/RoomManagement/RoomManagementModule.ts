import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ParticipantRepository } from '@app/RoomManagement/repositories/ParticipantRepository';
import { RoomRepository } from '@app/RoomManagement/repositories/RoomRepository';

@Module({
  imports: [TypeOrmModule.forFeature([ParticipantRepository, RoomRepository])],
})
export class RoomManagementModule {}
