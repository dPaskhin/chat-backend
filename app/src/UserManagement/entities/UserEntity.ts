/*
eslint
import/no-cycle: off,
*/
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { ParticipantEntity } from '@app/RoomManagement/entities/ParticipantEntity';
import { UserRelation } from '@app/UserManagement/enums/UserRelation';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ unique: true, nullable: false })
  public login!: string;

  @Exclude()
  @Column({ nullable: false })
  public password!: string;

  @Column({ nullable: true })
  public firstName!: string;

  @Column({ nullable: true })
  public lastName!: string;

  @OneToMany(() => ParticipantEntity, (participant) => participant.user)
  public [UserRelation.PARTICIPANTS]!: ParticipantEntity[];
}
