import { ArgumentsHost, Injectable, WsExceptionFilter } from '@nestjs/common';
import { Socket } from 'socket.io';

import { SystemError } from '@app/SystemError/dto/SystemError';
import { ValidationError } from '@app/ValidationError/dto/ValidationError';
import { WsValidationErrorHandler } from '@app/ErrorFilter/services/ws/WsValidationErrorHandler';
import { WsDefaultHandler } from '@app/ErrorFilter/services/ws/WsDefaultHandler';
import { WsSystemErrorHandler } from '@app/ErrorFilter/services/ws/WsSystemErrorHandler';

@Injectable()
export class WsErrorFilter implements WsExceptionFilter {
  public constructor(
    private readonly wsValidationErrorHandler: WsValidationErrorHandler,
    private readonly wsSystemErrorHandler: WsSystemErrorHandler,
    private readonly wsDefaultHandler: WsDefaultHandler,
  ) {}

  public catch(exception: Error, host: ArgumentsHost): void {
    const client = host.switchToWs().getClient<Socket>();

    try {
      if (exception instanceof ValidationError) {
        this.wsValidationErrorHandler.handle(exception, client);

        return;
      }

      if (exception instanceof SystemError) {
        this.wsSystemErrorHandler.handle(exception, client);

        return;
      }

      this.wsDefaultHandler.handle(exception, client);
    } catch (error) {
      this.wsDefaultHandler.handle(error as Error, client);
    }
  }
}
