import { z } from 'zod';

// 독서 상태 ENUM: PLAN / READING / DONE
export const ReadingStatusSchema = z.enum(['PLAN', 'READING', 'DONE']);
export type ReadingStatus = z.infer<typeof ReadingStatusSchema>;

// 공개 범위 ENUM: PUBLIC / PRIVATE
export const VisibilitySchema = z.enum(['PUBLIC', 'PRIVATE']);
export type Visibility = z.infer<typeof VisibilitySchema>;

// 날짜 문자열: YYYY-MM-DD
export const DateStringSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식이어야 합니다.');

export type DateString = z.infer<typeof DateStringSchema>;

// 별점: 1~5
export const RatingSchema = z.number().int().min(1).max(5);
export type Rating = z.infer<typeof RatingSchema>;