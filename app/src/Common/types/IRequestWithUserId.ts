import { Request } from 'express';

export type IRequestWithUserId = Request & { userId: string };
