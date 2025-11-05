// 에러 기본 클래스
export class AppError extends Error {
  constructor(public code = 500, message = 'Error', public status = 500) {
    super(message);
  }
}

// 우선 기본 에러들만 ..
export class NotFoundError extends AppError {
  constructor(message = '리소스를 찾을 수 없습니다.') {
    super(404, message, 404);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = '접근 권한이 없습니다.') {
    super(403, message, 403);
  }
}

export class ValidationError extends AppError {
  constructor(message = '유효성 검사에 실패 하였습니다.') {
    super(400, message, 400);
  }
}