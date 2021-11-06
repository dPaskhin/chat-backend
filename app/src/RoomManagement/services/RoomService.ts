import { HttpStatus, Injectable } from '@nestjs/common';

import { RoomRepository } from '@app/RoomManagement/repositories/RoomRepository';
import { RoomEntity } from '@app/RoomManagement/entities/RoomEntity';
import { CreateRoomDto } from '@app/RoomManagement/dto/CreateRoomDto';
import { ParticipantService } from '@app/RoomManagement/services/ParticipantService';
import { UserService } from '@app/UserManagement/services/UserService';
import { SystemErrorFactory } from '@app/SystemError/factories/SystemErrorFactory';
import { UserEntity } from '@app/UserManagement/entities/UserEntity';

@Injectable()
export class RoomService {
  public constructor(
    private readonly roomRepository: RoomRepository,
    private readonly participantService: ParticipantService,
    private readonly userService: UserService,
    private readonly systemErrorFactory: SystemErrorFactory,
  ) {}

  public getAll(relations?: string[]): Promise<RoomEntity[]> {
    return this.roomRepository.find({ relations });
  }

  public async create(
    currentUser: UserEntity,
    dto: CreateRoomDto,
  ): Promise<RoomEntity> {
    const notExistingUserIds = await this.userService.getNotExistingIds(
      dto.userIds,
    );

    if (notExistingUserIds.length > 0) {
      throw this.systemErrorFactory.create(
        HttpStatus.BAD_REQUEST,
        `Не найдены пользователи с кем создается комната - ${notExistingUserIds.join(
          ', ',
        )}`,
      );
    }

    const participantUsers = await this.userService.getByIds(dto.userIds);

    const participantsWithCommonRoom =
      await this.participantService.getParticipantsWithCommonRoomByUsers(
        currentUser,
        participantUsers,
      );

    if (participantsWithCommonRoom.length > 0) {
      throw this.systemErrorFactory.create(
        HttpStatus.BAD_REQUEST,
        `С этими пользователями уже есть комната - ${participantsWithCommonRoom
          .map(({ user }) => user.id)
          .join(', ')}`,
      );
    }

    const participants = await this.participantService.createByUsers([
      currentUser,
      ...participantUsers,
    ]);

    return this.roomRepository.save({ participants });
  }
}
