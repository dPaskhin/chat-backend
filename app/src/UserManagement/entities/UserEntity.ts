import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
