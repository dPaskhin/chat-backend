import { IsDefined, IsString, IsUUID } from 'class-validator';

export class CreateMessageDto {
  @IsDefined({ message: 'Не передано значение сообщения' })
  @IsString({ message: 'Сообщение должно быть строкой' })
  public value!: string;

  @IsDefined({ message: 'Не передан id комнаты' })
  @IsString({ message: 'Id комнаты должно быть строкой' })
  @IsUUID('all', { message: 'Id комнаты должно быть UUID' })
  public roomId!: string;
}
