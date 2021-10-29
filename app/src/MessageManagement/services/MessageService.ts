import { HttpStatus, Injectable } from '@nestjs/common';

import { MessageRepository } from '@app/MessageManagement/repositories/MessageRepository';
import { MessageEntity } from '@app/MessageManagement/entities/MessageEntity';
import { ParticipantService } from '@app/RoomManagement/services/ParticipantService';
import { CreateMessageDto } from '@app/MessageManagement/dto/CreateMessageDto';
import { SystemErrorFactory } from '@app/SystemError/factories/SystemErrorFactory';

@Injectable()
export class MessageService {
  public constructor(
    private readonly messageRepository: MessageRepository,
    private readonly participantService: ParticipantService,
    private readonly systemErrorFactory: SystemErrorFactory,
  ) {}

  public async create(
    currentUserId: string,
    dto: CreateMessageDto,
  ): Promise<MessageEntity> {
    const candidateParticipant =
      await this.participantService.findByUserIdAndRoomId(
        currentUserId,
        dto.roomId,
      );

    if (!candidateParticipant) {
      throw this.systemErrorFactory.create(
        HttpStatus.BAD_REQUEST,
        'Отправитель сообщения не был найден',
      );
    }

    return this.messageRepository.save({
      value: dto.value,
      participant: candidateParticipant,
    });
  }
}
