import { IsDefined, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsDefined({ message: 'Логин обязательный' })
  @MinLength(5, { message: 'Логин должен содержать больше пяти символов' })
  public login!: string;

  @IsDefined({ message: 'Пароль обязательный' })
  @MinLength(5, { message: 'Пароль должен содержать больше пяти символов' })
  public password!: string;
}
