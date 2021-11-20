import {
  Injectable,
  PipeTransform,
  ValidationPipe as ValidationPipeBase,
} from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common/interfaces/features/pipe-transform.interface';

import { ValidationErrorFactory } from '@app/ValidationError/factories/ValidationErrorFactory';

@Injectable()
export class ValidationPipe implements PipeTransform {
  public constructor(
    private readonly validationErrorFactory: ValidationErrorFactory,
  ) {}

  public transform(
    value: unknown,
    metadata: ArgumentMetadata,
  ): Promise<unknown> {
    return new ValidationPipeBase({
      exceptionFactory: this.validationErrorFactory.create.bind(
        this.validationErrorFactory,
      ),
      whitelist: true,
    }).transform(value, metadata);
  }
}
