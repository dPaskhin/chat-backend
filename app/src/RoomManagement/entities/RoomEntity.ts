/*
eslint
import/no-cycle: off,
*/
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ParticipantEntity } from '@app/RoomManagement/entities/ParticipantEntity';
import { RoomRelation } from '@app/RoomManagement/enums/RoomRelation';

@Entity('room')
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @OneToMany(() => ParticipantEntity, (participant) => participant.room)
  public [RoomRelation.PARTICIPANTS]!: ParticipantEntity[];
}
