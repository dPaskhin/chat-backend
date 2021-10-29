import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@app/Common/guards/AuthGuard';
import { CreateMessageDto } from '@app/MessageManagement/dto/CreateMessageDto';
import { MessageEntity } from '@app/MessageManagement/entities/MessageEntity';
import { MessageService } from '@app/MessageManagement/services/MessageService';
import { UserIdDecorator } from '@app/Common/decorators/UserIdDecorator';

@Controller('message-management')
export class MessageManagementController {
  public constructor(private readonly messageService: MessageService) {}

  @UseGuards(AuthGuard)
  @Post('/add-message')
  public addMessage(
    @UserIdDecorator() userId: string,
    @Body() dto: CreateMessageDto,
  ): Promise<MessageEntity> {
    return this.messageService.create(userId, dto);
  }
}
