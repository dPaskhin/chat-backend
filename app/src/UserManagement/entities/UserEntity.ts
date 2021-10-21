import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

// eslint-disable-next-line import/no-cycle
import { MessageEntity } from '@app/MessageManagement/entities/MessageEntity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: number;

  @Column({ unique: true, nullable: false })
  public login!: string;

  @Column({ nullable: false })
  public password!: string;

  @Column({ nullable: true })
  public firstName!: string;

  @Column({ nullable: true })
  public lastName!: string;

  @OneToMany(() => MessageEntity, (message) => message.user, { eager: true })
  public messages!: MessageEntity[];
}
