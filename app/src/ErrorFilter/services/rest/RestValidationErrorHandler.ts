import { Request, Response } from 'express';
import { HttpStatus, Injectable } from '@nestjs/common';

import { IRestHandler } from '@app/ErrorFilter/types/IRestHandler';
import { ErrorApiResponseFactory } from '@app/ErrorFilter/factories/ErrorApiResponseFactory';
import { ValidationError } from '@app/ValidationError/dto/ValidationError';

@Injectable()
export class RestValidationErrorHandler implements IRestHandler {
  public constructor(
    private readonly errorApiResponseFactory: ErrorApiResponseFactory,
  ) {}

  public handle(error: ValidationError, req: Request, res: Response): void {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY);

    res.json(
      this.errorApiResponseFactory.create(
        error,
        HttpStatus.UNPROCESSABLE_ENTITY,
        error.getErrors(),
      ),
    );
  }
}
