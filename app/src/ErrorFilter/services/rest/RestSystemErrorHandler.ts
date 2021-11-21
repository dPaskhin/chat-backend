import { Request, Response } from 'express';
import { Injectable } from '@nestjs/common';

import { IRestHandler } from '@app/ErrorFilter/types/IRestHandler';
import { ErrorApiResponseFactory } from '@app/ErrorFilter/factories/ErrorApiResponseFactory';
import { SystemError } from '@app/SystemError/dto/SystemError';

@Injectable()
export class RestSystemErrorHandler implements IRestHandler {
  public constructor(
    private readonly errorApiResponseFactory: ErrorApiResponseFactory,
  ) {}

  public handle(error: SystemError, req: Request, res: Response): void {
    res.status(error.code);

    res.json(this.errorApiResponseFactory.create(error, error.code));
  }
}
