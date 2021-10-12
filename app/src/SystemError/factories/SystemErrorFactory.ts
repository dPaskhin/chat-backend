import { HttpStatus, Injectable } from '@nestjs/common';

import { SystemError } from '@app/SystemError/dto/SystemError';

@Injectable()
export class SystemErrorFactory {
  public create(errorCode: HttpStatus, message?: string): SystemError {
    const systemError = new SystemError(message);

    systemError.code = errorCode;

    return systemError;
  }
}
