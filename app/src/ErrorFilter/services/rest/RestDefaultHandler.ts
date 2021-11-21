import { Request, Response } from 'express';
import { HttpStatus, Injectable } from '@nestjs/common';

import { IRestHandler } from '@app/ErrorFilter/types/IRestHandler';
import { ErrorApiResponseFactory } from '@app/ErrorFilter/factories/ErrorApiResponseFactory';

@Injectable()
export class RestDefaultHandler implements IRestHandler {
  public constructor(
    private readonly errorApiResponseFactory: ErrorApiResponseFactory,
  ) {}

  public handle(error: Error, req: Request, res: Response): void {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR);

    res.json(
      this.errorApiResponseFactory.create(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      ),
    );
  }
}
