import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@app/Common/guards/AuthGuard';
import { CreateMessageDto } from '@app/MessageManagement/dto/CreateMessageDto';
import { MessageEntity } from '@app/MessageManagement/entities/MessageEntity';
import { MessageService } from '@app/MessageManagement/services/MessageService';
import { CurrentUserDecorator } from '@app/Common/decorators/CurrentUserDecorator';
import { UserEntity } from '@app/UserManagement/entities/UserEntity';

@Controller('message-management')
export class MessageManagementController {
  public constructor(private readonly messageService: MessageService) {}

  @UseGuards(AuthGuard)
  @Post('/add-message')
  public addMessage(
    @CurrentUserDecorator() currentUser: UserEntity,
    @Body() dto: CreateMessageDto,
  ): Promise<MessageEntity> {
    return this.messageService.create(currentUser, dto);
  }
}
