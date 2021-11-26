import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { RoomEntity } from '@app/RoomManagement/entities/RoomEntity';
import { RoomService } from '@app/RoomManagement/services/RoomService';
import { CreateRoomDto } from '@app/RoomManagement/dto/CreateRoomDto';
import { AuthGuard } from '@app/Common/guards/AuthGuard';
import { CurrentUserDecorator } from '@app/Common/decorators/CurrentUserDecorator';
import { UserEntity } from '@app/UserManagement/entities/UserEntity';
import { QueryIncludes } from '@app/Common/decorators/QueryIncludes';
import { ParticipantEntity } from '@app/RoomManagement/entities/ParticipantEntity';
import { ParticipantService } from '@app/RoomManagement/services/ParticipantService';

@Controller('room-management')
export class RoomManagementController {
  public constructor(
    private readonly roomService: RoomService,
    private readonly participantService: ParticipantService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/rooms')
  public getRooms(@QueryIncludes() includes: string[]): Promise<RoomEntity[]> {
    return this.roomService.getAll(includes);
  }

  @UseGuards(AuthGuard)
  @Post('/add-room')
  public addRoom(
    @CurrentUserDecorator() currentUser: UserEntity,
    @Body() body: CreateRoomDto,
  ): Promise<RoomEntity> {
    return this.roomService.create(currentUser, body);
  }

  @UseGuards(AuthGuard)
  @Get('/rooms/:roomId/participants')
  public getParticipants(
    @CurrentUserDecorator() currentUser: UserEntity,
    @Param('roomId') roomId: string,
    @QueryIncludes() includes: string[],
  ): Promise<ParticipantEntity[]> {
    return this.participantService.getByRoomId(roomId, includes);
  }
}
