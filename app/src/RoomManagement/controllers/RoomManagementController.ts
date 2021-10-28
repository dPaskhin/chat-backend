import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { RoomEntity } from '@app/RoomManagement/entities/RoomEntity';
import { RoomService } from '@app/RoomManagement/services/RoomService';
import { CreateRoomDto } from '@app/RoomManagement/dto/CreateRoomDto';
import { AuthGuard } from '@app/Common/guards/AuthGuard';
import { UserIdDecorator } from '@app/Common/decorators/UserIdDecorator';

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
    @UserIdDecorator() userId: string,
    @Body() body: CreateRoomDto,
  ): Promise<RoomEntity> {
    return this.roomService.create(userId, body);
  }
}
