import { EntityRepository, Repository } from 'typeorm';

import { RoomEntity } from '@app/RoomManagement/entities/RoomEntity';

@EntityRepository(RoomEntity)
export class RoomRepository extends Repository<RoomEntity> {}
