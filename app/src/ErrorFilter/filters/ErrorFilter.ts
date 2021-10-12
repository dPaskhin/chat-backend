import {
  ArgumentsHost,
  ExceptionFilter,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { RestDefaultHandler } from '@app/ErrorFilter/services/rest/RestDefaultHandler';
import { SystemError } from '@app/SystemError/dto/SystemError';
import { RestNotFoundHandler } from '@app/ErrorFilter/services/rest/RestNotFoundHandler';
import { ValidationError } from '@app/ValidationError/dto/ValidationError';
import { RestValidationErrorHandler } from '@app/ErrorFilter/services/rest/RestValidationErrorHandler';
import { RestSystemErrorHandler } from '@app/ErrorFilter/services/rest/RestSystemErrorHandler';

@Injectable()
export class ErrorFilter implements ExceptionFilter {
  public constructor(
    private readonly restDefaultHandler: RestDefaultHandler,
    private readonly restNotFoundHandler: RestNotFoundHandler,
    private readonly restValidationErrorHandler: RestValidationErrorHandler,
    private readonly restSystemErrorHandler: RestSystemErrorHandler,
  ) {}

  public catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const req = ctx.getRequest();
    const res = ctx.getResponse();

    try {
      if (exception instanceof NotFoundException) {
        this.restNotFoundHandler.handle(exception, req, res);

        return;
      }

      if (exception instanceof ValidationError) {
        this.restValidationErrorHandler.handle(exception, req, res);

        return;
      }

      if (exception instanceof SystemError) {
        this.restSystemErrorHandler.handle(exception, req, res);

        return;
      }

      this.restDefaultHandler.handle(exception, req, res);
    } catch (error) {
      this.restDefaultHandler.handle(error as Error, req, res);
    }
  }
}
