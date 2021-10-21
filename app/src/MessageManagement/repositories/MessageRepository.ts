import { EntityRepository, Repository } from 'typeorm';

import { MessageEntity } from '@app/MessageManagement/entities/MessageEntity';

@EntityRepository(MessageEntity)
export class MessageRepository extends Repository<MessageEntity> {}
