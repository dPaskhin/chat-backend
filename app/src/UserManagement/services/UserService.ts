import { Injectable } from '@nestjs/common';
import { uniq } from 'lodash';
import { ILike } from 'typeorm';
import { FindConditions } from 'typeorm/find-options/FindConditions';

import { UserRepository } from '@app/UserManagement/repositories/UserRepository';
import { UserEntity } from '@app/UserManagement/entities/UserEntity';
import { CreateUserDto } from '@app/UserManagement/dto/CreateUserDto';
import { GetUserFilterDto } from '@app/UserManagement/dto/GetUserFilterDto';

@Injectable()
export class UserService {
  public constructor(private readonly userRepository: UserRepository) {}

  private static getWhereBuilder(
    filter?: GetUserFilterDto,
  ): FindConditions<UserEntity> {
    if (filter?.login) {
      return {
        login: ILike(`${filter.login}%`),
      };
    }

    return {};
  }

  public get(filter?: GetUserFilterDto): Promise<UserEntity[]> {
    return this.userRepository.find({
      where: UserService.getWhereBuilder(filter),
      take: filter?.count,
    });
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
