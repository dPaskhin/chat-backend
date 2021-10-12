import { IsDefined } from 'class-validator';

export class LoginDto {
  @IsDefined({ message: 'Логин обязательный' })
  public login!: string;

  @IsDefined({ message: 'Пароль обязательный' })
  public password!: string;
}
