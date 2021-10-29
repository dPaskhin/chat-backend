import { IsDefined } from 'class-validator';

export class CreateMessageDto {
  @IsDefined({ message: 'Не передано значение сообщения' })
  public value!: string;

  @IsDefined({ message: 'Не передан id комнаты' })
  public roomId!: string;
}
