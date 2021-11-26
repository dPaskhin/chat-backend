import { IsDefined, IsString, IsUUID } from 'class-validator';

export class ChangeRoomDto {
  @IsDefined({ message: 'Не передан id комнаты' })
  @IsString({ message: 'Id комнаты должно быть строкой' })
  @IsUUID('all', { message: 'Id комнаты должно быть UUID' })
  public roomId!: string;
}
