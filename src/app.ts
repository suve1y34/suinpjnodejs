import express from 'express';
import { notFound } from './middleware/not-found';
import { errorHandler } from './middleware/error-handler';

const app = express();

app.use(express.json());

// 테스트용 라우트
app.get('/test', (_req, res) => {
  res.json({ status: 'ok' });
});

// 에러 핸들러
app.use(notFound);
app.use(errorHandler);

export default app;