import { Request, Response } from 'express';

export interface IRestHandler {
  handle(error: Error, req: Request, res: Response): void;
}
