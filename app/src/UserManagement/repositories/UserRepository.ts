import { EntityRepository, Repository } from 'typeorm';

import { UserEntity } from '@app/UserManagement/entities/UserEntity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
