import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../exception/errors';

/**
 * ZodError > 한 줄 메시지로 변환
 */
function formatZodError(err: ZodError): string {
  // ex) "body.title: 필수 값입니다"
  return err.issues
    .map((issue) => {
      const path = issue.path.join('.') || 'value';
      return `${path}: ${issue.message}`;
    })
    .join(', ');
}

/**
 * 공통 바디 검증 미들웨어 팩토리
 * schema.safeParse(req.body)
 * 실패 시 ValidationError 던짐
 * 성공 시 req.body를 파싱된 값으로 교체
 */
export function validateBody<T>(schema: ZodSchema<T>): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = formatZodError(result.error);
      throw new ValidationError(message);
    }

    // 검증 통과한 값으로 덮어쓰기
    req.body = result.data as any;
    next();
  };
}

/**
 * 쿼리 스트링 검증 미들웨어
 */
export function validateQuery<T>(schema: ZodSchema<T>): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      const message = formatZodError(result.error);
      throw new ValidationError(message);
    }

    req.query = result.data as any;
    next();
  };
}

/**
 * path param 검증 미들웨어
 */
export function validateParams<T>(schema: ZodSchema<T>): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      const message = formatZodError(result.error);
      throw new ValidationError(message);
    }

    req.params = result.data as any;
    next();
  };
}