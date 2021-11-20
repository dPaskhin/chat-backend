import { Global, Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { ValidationErrorFactory } from '@app/ValidationError/factories/ValidationErrorFactory';
import { ValidationPipe } from '@app/ValidationError/pipes/ValidationPipe';

@Global()
@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    ValidationErrorFactory,
  ],
  exports: [ValidationErrorFactory],
})
export class ValidationErrorModule {}
