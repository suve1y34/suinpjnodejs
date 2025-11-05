// 공통 응답 정의
export type ApiResponse<T = unknown> = {
  code: number;     // 코드 (0=성공, etc=실패)
  message: string;  // 메시지
  data: T | null;   // 페이로드
};

// 성공
export const ok = <T>(data: T, message = 'OK'): ApiResponse<T> => ({
  code: 0,
  message,
  data,
});

// 실패
export const fail = (code: number, message: string): ApiResponse<null> => ({
  code,
  message,
  data: null,
});