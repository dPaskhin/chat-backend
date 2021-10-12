import { HttpStatus } from '@nestjs/common';

export class SystemError extends Error {
  public code!: HttpStatus;

  public constructor(public readonly message: string = '') {
    super(message);

    this.name = 'SystemError';
  }
}
