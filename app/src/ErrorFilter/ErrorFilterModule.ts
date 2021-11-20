import { Global, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ErrorFilter } from '@app/ErrorFilter/filters/ErrorFilter';
import { RestDefaultHandler } from '@app/ErrorFilter/services/rest/RestDefaultHandler';
import { ErrorApiResponseFactory } from '@app/ErrorFilter/factories/ErrorApiResponseFactory';
import { RestNotFoundHandler } from '@app/ErrorFilter/services/rest/RestNotFoundHandler';
import { RestSystemErrorHandler } from '@app/ErrorFilter/services/rest/RestSystemErrorHandler';
import { RestValidationErrorHandler } from '@app/ErrorFilter/services/rest/RestValidationErrorHandler';
import { WsErrorFilter } from '@app/ErrorFilter/filters/WsErrorFilter';
import { WsDefaultHandler } from '@app/ErrorFilter/services/ws/WsDefaultHandler';
import { WsSystemErrorHandler } from '@app/ErrorFilter/services/ws/WsSystemErrorHandler';
import { WsValidationErrorHandler } from '@app/ErrorFilter/services/ws/WsValidationErrorHandler';

@Global()
@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    ErrorApiResponseFactory,
    RestDefaultHandler,
    RestNotFoundHandler,
    RestSystemErrorHandler,
    RestValidationErrorHandler,
    WsErrorFilter,
    WsDefaultHandler,
    WsSystemErrorHandler,
    WsValidationErrorHandler,
  ],
  exports: [
    WsErrorFilter,
    WsDefaultHandler,
    WsSystemErrorHandler,
    WsValidationErrorHandler,
  ],
})
export class ErrorFilterModule {}
