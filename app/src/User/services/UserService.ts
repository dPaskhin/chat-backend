import { Injectable } from '@nestjs/common';

import { UserRepository } from '@app/User/repositories/UserRepository';
import { UserEntity } from '@app/User/entities/UserEntity';
import { CreateUserDto } from '@app/User/dto/CreateUserDto';

@Injectable()
export class UserService {
  public constructor(private readonly userRepository: UserRepository) {}

  public getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  public async findByLogin(login: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { login } });
  }

  public async create(dto: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save(dto);
  }
}
