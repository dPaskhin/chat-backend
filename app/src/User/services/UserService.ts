import { Injectable } from '@nestjs/common';

import { UserRepository } from '@app/User/repositories/UserRepository';
import { UserEntity } from '@app/User/entities/UserEntity';

@Injectable()
export class UserService {
  public constructor(private readonly userRepository: UserRepository) {}

  public getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
