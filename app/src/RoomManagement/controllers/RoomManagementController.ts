import { Body, Controller, Get, Post } from '@nestjs/common';

import { RoomEntity } from '@app/RoomManagement/entities/RoomEntity';
import { RoomService } from '@app/RoomManagement/services/RoomService';
import { CreateRoomDto } from '@app/RoomManagement/dto/CreateRoomDto';

@Controller('room-management')
export class RoomManagementController {
  public constructor(private readonly roomService: RoomService) {}

  @Get('/rooms')
  public getRooms(): Promise<RoomEntity[]> {
    return this.roomService.getAll();
  }

  @Post('/add-room')
  public addRoom(@Body() body: CreateRoomDto): Promise<RoomEntity> {
    return this.roomService.create(body);
  }
}
