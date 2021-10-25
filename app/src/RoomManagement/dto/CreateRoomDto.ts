import { IsDefined } from 'class-validator';

export class CreateRoomDto {
  @IsDefined({
    message: 'Не передан id текущего пользователя.',
  })
  public currentUserId!: string;

  @IsDefined({
    message: 'Не переданы id пользователей с кем создается комната',
  })
  public userIds!: string[];
}
