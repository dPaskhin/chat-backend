import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUserFilterDto {
  @IsOptional()
  @IsString({ message: 'Логин должен быть строкой' })
  public login?: string;

  @IsOptional()
  @IsInt({ message: 'Количество пользователей должно быть числом' })
  @Type(() => Number)
  public count?: number;
}
