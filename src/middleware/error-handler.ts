import type { Request, Response, NextFunction } from "express";
import { AppError } from "../exception/errors";
import { fail } from "../common/api-response";

// 전역 에러 처리
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.status).json(fail(err.code, err.message));
  }

  console.error(err); // 콘솔에 에러출력
  return res.status(500).json(fail(500, '서버 에러가 발생했습니다.'));
}