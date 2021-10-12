import { Request, Response } from 'express';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { IRestHandler } from '@app/ErrorFilter/interfaces/IRestHandler';
import { ErrorApiResponseFactory } from '@app/ErrorFilter/factories/ErrorApiResponseFactory';

@Injectable()
export class RestNotFoundHandler implements IRestHandler {
  public constructor(
    private readonly errorApiResponseFactory: ErrorApiResponseFactory,
  ) {}

  public handle(error: NotFoundException, req: Request, res: Response): void {
    res.status(HttpStatus.NOT_FOUND);

    res.json(this.errorApiResponseFactory.create(error, HttpStatus.NOT_FOUND));
  }
}
