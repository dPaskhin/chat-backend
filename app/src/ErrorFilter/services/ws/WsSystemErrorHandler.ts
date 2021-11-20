import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

import { ErrorApiResponseFactory } from '@app/ErrorFilter/factories/ErrorApiResponseFactory';
import { SystemError } from '@app/SystemError/dto/SystemError';
import { IWsHandler } from '@app/ErrorFilter/interfaces/IWsHandler';
import { EXCEPTION_EVENT } from '@app/ErrorFilter/services/ws/WsDefaultHandler';

@Injectable()
export class WsSystemErrorHandler implements IWsHandler {
  public constructor(
    private readonly errorApiResponseFactory: ErrorApiResponseFactory,
  ) {}

  public handle(error: SystemError, client: Socket): void {
    client.emit(
      EXCEPTION_EVENT,
      this.errorApiResponseFactory.create(error, error.code),
    );
  }
}
