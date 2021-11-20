import { HttpStatus, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

import { ErrorApiResponseFactory } from '@app/ErrorFilter/factories/ErrorApiResponseFactory';
import { IWsHandler } from '@app/ErrorFilter/interfaces/IWsHandler';

export const EXCEPTION_EVENT = 'exception';

@Injectable()
export class WsDefaultHandler implements IWsHandler {
  public constructor(
    private readonly errorApiResponseFactory: ErrorApiResponseFactory,
  ) {}

  public handle(error: Error, client: Socket): void {
    client.emit(
      EXCEPTION_EVENT,
      this.errorApiResponseFactory.create(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      ),
    );
  }
}
