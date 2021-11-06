import { Global, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { ValidationErrorFactory } from '@app/ValidationError/factories/ValidationErrorFactory';

@Global()
@Module({
  providers: [
    ValidationErrorFactory,
    {
      provide: APP_PIPE,
      useFactory: (factory: ValidationErrorFactory) =>
        new ValidationPipe({
          exceptionFactory: factory.create.bind(factory),
          whitelist: true,
        }),
      inject: [ValidationErrorFactory],
    },
  ],
  exports: [ValidationErrorFactory],
})
export class ValidationErrorModule {}
