import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Socket } from 'socket.io';

import { CreateMessageDto } from '@app/MessageManagement/dto/CreateMessageDto';
import { MessageService } from '@app/MessageManagement/services/MessageService';
import { BaseWsGateway } from '@app/Common/gateways/BaseWsGateway';
import { ISocketWithUser } from '@app/Common/types/ISocketWithUser';
import { WsAuthGuard } from '@app/Common/guards/WsAuthGuard';
import { ChangeRoomDto } from '@app/MessageManagement/dto/ChangeRoomDto';

@WebSocketGateway({ namespace: 'message-management' })
export class MessageGateway extends BaseWsGateway {
  public constructor(private readonly messageService: MessageService) {
    super();
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('message-to-server')
  public async messageToServer(
    @MessageBody() dto: CreateMessageDto,
    @ConnectedSocket() client: ISocketWithUser,
  ): Promise<void> {
    const createdMessage = await this.messageService.create(client.user, dto);

    this.server.to(dto.roomId).emit('message-to-client', createdMessage);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('join-room')
  public async joinRoom(
    @MessageBody() dto: ChangeRoomDto,
    @ConnectedSocket() client: ISocketWithUser,
  ): Promise<void> {
    await client.join(dto.roomId);
  }

  @SubscribeMessage('leave-room')
  public async leaveRoom(
    @MessageBody() dto: ChangeRoomDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    await client.leave(dto.roomId);
  }
}
