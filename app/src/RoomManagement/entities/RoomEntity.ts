import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// eslint-disable-next-line import/no-cycle
import { ParticipantEntity } from '@app/RoomManagement/entities/ParticipantEntity';

@Entity('room')
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: number;

  @OneToMany(() => ParticipantEntity, (participant) => participant.room, {
    eager: true,
  })
  public participants!: ParticipantEntity[];
}
