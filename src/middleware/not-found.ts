import type { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../exception/errors';

export function notFound(_req: Request, _res: Response, next: NextFunction) {
  next(new NotFoundError());
}