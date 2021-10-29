import { Injectable } from '@nestjs/common';
import { uniqBy } from 'lodash';

import { ParticipantRepository } from '@app/RoomManagement/repositories/ParticipantRepository';
import { ParticipantEntity } from '@app/RoomManagement/entities/ParticipantEntity';
import { UserEntity } from '@app/UserManagement/entities/UserEntity';
import { ParticipantRelation } from '@app/RoomManagement/enums/ParticipantRelation';

@Injectable()
export class ParticipantService {
  public constructor(
    private readonly participantRepository: ParticipantRepository,
  ) {}

  public findByUserIdAndRoomId(
    userId: string,
    roomId: string,
  ): Promise<ParticipantEntity | undefined> {
    return this.participantRepository.findOne({
      where: { user: { id: userId }, room: { id: roomId } },
    });
  }

  public createByUsers(users: UserEntity[]): Promise<ParticipantEntity[]> {
    return this.participantRepository.save(users.map((user) => ({ user })));
  }

  public getByUserIds(
    ids: string[],
    relations?: ParticipantRelation[],
  ): Promise<ParticipantEntity[]> {
    return this.participantRepository.find({
      where: ids.map((id) => ({ user: { id } })),
      relations,
    });
  }

  public async getParticipantsWithCommonRoomByUsers(
    targetUser: UserEntity,
    usersToCheck: UserEntity[],
  ): Promise<ParticipantEntity[]> {
    const targetParticipants = await this.getByUserIds(
      [targetUser.id],
      [ParticipantRelation.ROOM],
    );

    const participantsToCheck = await this.getByUserIds(
      usersToCheck.map(({ id }) => id),
      [ParticipantRelation.ROOM, ParticipantRelation.USER],
    );

    return uniqBy(
      participantsToCheck.filter(({ room }) =>
        targetParticipants.some(
          (participant) => participant.room.id === room.id,
        ),
      ),
      'user.id',
    );
  }
}
