import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config';
import routes from './routes';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { notFound } from './middlewares/notFound';
import { sendResponse } from './utils/sendResponse';

const app = express();

// Requests may come from the deployed client, local dev, or tooling (no origin).
const allowedOrigins = new Set([
  config.clientUrl,
  'http://localhost:5173',
  'http://localhost:3000',
]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) return callback(null, true);
      callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (_req, res) => {
  sendResponse(res, {
    statusCode: 200,
    message: 'React Blogify API',
    data: { name: 'react-blogify-server', version: '2.0.0' },
  });
});

app.use('/api/v1', routes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
