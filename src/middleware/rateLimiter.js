import rateLimit from 'express-rate-limit';
import { errorResponse } from '../utils/response.js';

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return errorResponse(res, 'Too many requests from this IP. Please try again after 15 minutes.', 429, 'RATE_LIMIT_EXCEEDED');
  },
});

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return errorResponse(res, 'API rate limit exceeded. Please slow down your requests.', 429, 'RATE_LIMIT_EXCEEDED');
  },
});
