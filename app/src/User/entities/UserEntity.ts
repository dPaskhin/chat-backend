import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: number;

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;
}
