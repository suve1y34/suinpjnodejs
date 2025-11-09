import { Router } from 'express';
import { ok } from '../common/api-response';
import { validateBody, validateParams } from '../middleware/validate';
import {
  ShelfItemAddSchema,
  ShelfItemUpdateSchema,
  ShelfBookIdParamSchema,
} from '../validation/shelf-item.schema';

const router = Router();

/**
 * /api/shelves/items
 * 현재 스모크 테스트용, 검증 통과한 값 그대로 응답으로
 */
router.post(
  '/items',
  validateBody(ShelfItemAddSchema),
  (req, res) => {
    // TODO: 실제 ShelfService.createShelfItem 로직 연결
    return res.json(
      ok(
        {
          body: req.body,
        },
        'ShelfItemAdd 검증 통과',
      ),
    );
  },
);

export default router;