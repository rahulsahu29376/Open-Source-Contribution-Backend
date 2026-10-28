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

// Cross-Origin Resource Sharing - allow all domains
app.use(
  cors({
    origin: true, // Allow all domains and dynamically reflect requesting origin for credentials support
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
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
