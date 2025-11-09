import { z } from 'zod';
import {
  ReadingStatusSchema,
  VisibilitySchema,
  DateStringSchema,
  RatingSchema,
} from './common.schema';

// 책장 아이템 추가 DTO (POST /api/shelves/items)
export const ShelfItemAddSchema = z.object({
  // API 설계에 따라 bookshelfId를 받는 경우
  bookshelfId: z.number().int().positive(),

  // 이미 존재하는 book을 사용하는 경우
  bookId: z.number().int().positive().optional(),

  // 신규 도서(알라딘 기반)인 경우
  isbn13Code: z.string().length(13).optional(),

  readingStatus: ReadingStatusSchema,

  currentPage: z.number().int().min(0).optional(),

  memo: z.string().max(4000).optional(),

  memoVisibility: VisibilitySchema.optional(),

  review: z.string().max(4000).optional(),

  reviewVisibility: VisibilitySchema.optional(),

  rating: RatingSchema.nullable().optional(),

  startDate: DateStringSchema.optional(),
  endDate: DateStringSchema.optional(),
});

// 업데이트 DTO (PUT/PATCH /api/shelves/items/:shelfBookId)
// 대부분 필드는 선택적(optional)로 두고, 서비스에서 기존 값과 merge
export const ShelfItemUpdateSchema = z.object({
  readingStatus: ReadingStatusSchema.optional(),

  currentPage: z.number().int().min(0).optional(),

  memo: z.string().max(4000).optional().nullable(), // 메모 비우기 허용

  memoVisibility: VisibilitySchema.optional(),

  review: z.string().max(4000).optional().nullable(), // 리뷰 비우기 허용

  reviewVisibility: VisibilitySchema.optional(),

  rating: RatingSchema.nullable().optional(),

  startDate: DateStringSchema.optional().nullable(),
  endDate: DateStringSchema.optional().nullable(),
});

// path param: shelfBookId (예: /api/shelves/items/:shelfBookId)
export const ShelfBookIdParamSchema = z.object({
  shelfBookId: z
    .string()
    .regex(/^\d+$/, 'shelfBookId는 숫자여야 합니다.')
    .transform((v) => Number(v)),
});

export type ShelfItemAddDto = z.infer<typeof ShelfItemAddSchema>;
export type ShelfItemUpdateDto = z.infer<typeof ShelfItemUpdateSchema>;
export type ShelfBookIdParamDto = z.infer<typeof ShelfBookIdParamSchema>;