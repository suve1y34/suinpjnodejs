import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../exception/errors';

export function methodNotAllowed(_req: Request, _res: Response, next: NextFunction) {
  next(new AppError(405, '허용되지 않은 메서드입니다.', 405));
}