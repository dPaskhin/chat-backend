/*
eslint
import/no-cycle: off,
*/
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ParticipantEntity } from '@app/RoomManagement/entities/ParticipantEntity';
import { MessageRelation } from '@app/MessageManagement/enums/MessageRelation';

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  public date!: Date;

  @Column({ nullable: false })
  public value!: string;

  @ManyToOne(() => ParticipantEntity, (participant) => participant.messages)
  public [MessageRelation.PARTICIPANT]!: ParticipantEntity;
}
