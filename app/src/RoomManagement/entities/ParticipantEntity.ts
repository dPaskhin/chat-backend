import { Entity, ManyToOne, OneToMany } from 'typeorm';

import { UserEntity } from '@app/UserManagement/entities/UserEntity';
// eslint-disable-next-line import/no-cycle
import { RoomEntity } from '@app/RoomManagement/entities/RoomEntity';
// eslint-disable-next-line import/no-cycle
import { MessageEntity } from '@app/MessageManagement/entities/MessageEntity';

@Entity('participant')
export class ParticipantEntity extends UserEntity {
  @ManyToOne(() => RoomEntity, (room) => room.participants)
  public room!: RoomEntity;

  @OneToMany(() => MessageEntity, (message) => message.participant, {
    eager: true,
  })
  public messages!: MessageEntity[];
}
