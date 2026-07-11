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
// Browsers attach an Origin header to every same-origin POST/PATCH/DELETE too,
// so the deployed client origin must be allowed even though the client proxies
// `/api` to us (see client/vercel.json). CLIENT_URL may be a comma-separated list.
const allowedOrigins = new Set(
  [
    ...config.clientUrl.split(',').map((o) => o.trim()),
    'http://localhost:5173',
    'http://localhost:3000',
    'https://react-blogify-client.vercel.app',
  ].filter(Boolean),
);

app.use(
  cors({
    origin(origin, callback) {
      // Reject unknown origins without CORS headers rather than throwing a 500.
      callback(null, !origin || allowedOrigins.has(origin));
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
