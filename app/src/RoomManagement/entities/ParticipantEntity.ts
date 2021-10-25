/*
eslint
import/no-cycle: off,
*/
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RoomEntity } from '@app/RoomManagement/entities/RoomEntity';
import { MessageEntity } from '@app/MessageManagement/entities/MessageEntity';
import { ParticipantRelation } from '@app/RoomManagement/enums/ParticipantRelation';
import { UserEntity } from '@app/UserManagement/entities/UserEntity';

@Entity('participant')
export class ParticipantEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @ManyToOne(() => UserEntity, (user) => user.participants)
  public [ParticipantRelation.USER]!: UserEntity;

  @ManyToOne(() => RoomEntity, (room) => room.participants)
  public [ParticipantRelation.ROOM]!: RoomEntity;

  @OneToMany(() => MessageEntity, (message) => message.participant)
  public [ParticipantRelation.MESSAGES]!: MessageEntity[];
}
