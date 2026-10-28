import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/environment.js';
import apiRouter from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';
import { errorResponse } from './utils/response.js';

const app = express();

// Security Headers
app.use(helmet());

// Cross-Origin Resource Sharing
const allowedOrigins = [
  config.frontendUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman) or matching allowed origins
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.onrender.com')) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Logging - token-safe
if (config.nodeEnv !== 'test') {
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
}

// Body parsing with safe size limit
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Global API rate limiter
app.use('/api', apiRateLimiter);

// Mount main API router
app.use('/api', apiRouter);

// 404 Handler
app.use((req, res) => {
  errorResponse(res, `Route ${req.method} ${req.originalUrl} not found`, 404, 'NOT_FOUND');
});

// Centralized Error Handler
app.use(errorHandler);

export default app;
