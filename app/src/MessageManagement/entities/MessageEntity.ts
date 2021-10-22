import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// eslint-disable-next-line import/no-cycle
import { ParticipantEntity } from '@app/RoomManagement/entities/ParticipantEntity';

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: number;

  @Column({ nullable: false })
  public value!: string;

  @ManyToOne(() => ParticipantEntity, (participant) => participant.messages)
  public participant!: ParticipantEntity;
}
