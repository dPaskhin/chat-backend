import { Injectable } from '@nestjs/common';
import { uniq } from 'lodash';

import { UserRepository } from '@app/UserManagement/repositories/UserRepository';
import { UserEntity } from '@app/UserManagement/entities/UserEntity';
import { CreateUserDto } from '@app/UserManagement/dto/CreateUserDto';

@Injectable()
export class UserService {
  public constructor(private readonly userRepository: UserRepository) {}

  public getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  public findById(id: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  public async findByLogin(login: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { login } });
  }

  public getByIds(ids: string[]): Promise<UserEntity[]> {
    return this.userRepository.findByIds(ids);
  }

  public async getNotExistingIds(ids: string[]): Promise<string[]> {
    const existsUserIds = (await this.getByIds(ids)).map(({ id }) => id);

    if (existsUserIds.length === ids.length) {
      return [];
    }

    return uniq(ids.filter((id) => !existsUserIds.includes(id)));
  }

  public async create(dto: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save(dto);
  }
}
