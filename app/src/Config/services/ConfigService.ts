import { HttpStatus, Injectable } from '@nestjs/common';

import { SystemErrorFactory } from '@app/SystemError/factories/SystemErrorFactory';
import { ConfigName } from '@app/Config/enums/ConfigName';

@Injectable()
export class ConfigService {
  public constructor(private readonly systemErrorFactory: SystemErrorFactory) {}

  public get<Name extends ConfigName>(name: Name): NodeJS.ProcessEnv[Name] {
    const value = process.env[name];

    if (value === undefined) {
      throw this.systemErrorFactory.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        `Не найден параметр конфига: ${name}`,
      );
    }

    return value;
  }

  public getIsResponseDetailError(): boolean {
    return this.get(ConfigName.RESPONSE_DETAIL_ERROR) === '1';
  }
}
