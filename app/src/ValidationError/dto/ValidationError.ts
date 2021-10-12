import { TUnknownObject } from '@app/Common/types/TUnknownObject';

export class ValidationError extends Error {
  public constructor(private readonly errors: TUnknownObject) {
    super();

    this.name = 'ValidationError';
  }

  public getErrors(): TUnknownObject {
    return this.errors;
  }
}
