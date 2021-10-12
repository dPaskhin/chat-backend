import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ErrorFilter } from '@app/ErrorFilter/filters/ErrorFilter';
import { RestDefaultHandler } from '@app/ErrorFilter/services/rest/RestDefaultHandler';
import { ErrorApiResponseFactory } from '@app/ErrorFilter/factories/ErrorApiResponseFactory';
import { RestNotFoundHandler } from '@app/ErrorFilter/services/rest/RestNotFoundHandler';
import { RestSystemErrorHandler } from '@app/ErrorFilter/services/rest/RestSystemErrorHandler';
import { RestValidationErrorHandler } from '@app/ErrorFilter/services/rest/RestValidationErrorHandler';

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
  ],
})
export class ErrorFilterModule {}
