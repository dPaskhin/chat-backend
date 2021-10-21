import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// eslint-disable-next-line import/no-cycle
import { UserEntity } from '@app/UserManagement/entities/UserEntity';

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: number;

  @Column({ nullable: false })
  public value!: string;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  public user!: UserEntity;
}
