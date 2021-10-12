import {
  Injectable,
  ValidationError as NestValidationError,
} from '@nestjs/common';

import { ValidationError } from '@app/ValidationError/dto/ValidationError';
import { TUnknownObject } from '@app/Common/types/TUnknownObject';

@Injectable()
export class ValidationErrorFactory {
  public create(errors: NestValidationError[]): ValidationError {
    const preparedErrors: TUnknownObject = Object.fromEntries(
      errors.map(({ property, constraints }) => [
        property,
        constraints ? Object.values(constraints)[0] : 'Неизвестная ошибка.',
      ]),
    );

    return new ValidationError(preparedErrors);
  }
}
