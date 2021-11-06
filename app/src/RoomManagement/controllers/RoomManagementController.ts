import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { RoomEntity } from '@app/RoomManagement/entities/RoomEntity';
import { RoomService } from '@app/RoomManagement/services/RoomService';
import { CreateRoomDto } from '@app/RoomManagement/dto/CreateRoomDto';
import { AuthGuard } from '@app/Common/guards/AuthGuard';
import { CurrentUserDecorator } from '@app/Common/decorators/CurrentUserDecorator';
import { UserEntity } from '@app/UserManagement/entities/UserEntity';

@Controller('room-management')
export class RoomManagementController {
  public constructor(private readonly roomService: RoomService) {}

  @UseGuards(AuthGuard)
  @Get('/rooms')
  public getRooms(): Promise<RoomEntity[]> {
    return this.roomService.getAll();
  }

  @UseGuards(AuthGuard)
  @Post('/add-room')
  public addRoom(
    @CurrentUserDecorator() currentUser: UserEntity,
    @Body() body: CreateRoomDto,
  ): Promise<RoomEntity> {
    return this.roomService.create(currentUser, body);
  }
}
