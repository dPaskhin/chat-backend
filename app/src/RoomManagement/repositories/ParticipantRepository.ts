import { EntityRepository, Repository } from 'typeorm';

import { ParticipantEntity } from '@app/RoomManagement/entities/ParticipantEntity';

@EntityRepository(ParticipantEntity)
export class ParticipantRepository extends Repository<ParticipantEntity> {}
