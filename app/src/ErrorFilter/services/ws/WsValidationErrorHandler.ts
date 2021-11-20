import { HttpStatus, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

import { ErrorApiResponseFactory } from '@app/ErrorFilter/factories/ErrorApiResponseFactory';
import { ValidationError } from '@app/ValidationError/dto/ValidationError';
import { IWsHandler } from '@app/ErrorFilter/interfaces/IWsHandler';
import { EXCEPTION_EVENT } from '@app/ErrorFilter/services/ws/WsDefaultHandler';

@Injectable()
export class WsValidationErrorHandler implements IWsHandler {
  public constructor(
    private readonly errorApiResponseFactory: ErrorApiResponseFactory,
  ) {}

  public handle(error: ValidationError, client: Socket): void {
    client.emit(
      EXCEPTION_EVENT,
      this.errorApiResponseFactory.create(
        error,
        HttpStatus.UNPROCESSABLE_ENTITY,
        error.getErrors(),
      ),
    );
  }
}
