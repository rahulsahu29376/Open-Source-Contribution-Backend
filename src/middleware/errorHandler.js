import { ZodError } from 'zod';
import { errorResponse } from '../utils/response.js';
import { config } from '../config/environment.js';

export const errorHandler = (err, req, res, next) => {
  // Structured logging (no tokens or passwords)
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message || err);

  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return errorResponse(res, 'Request validation failed', 400, 'VALIDATION_ERROR', formattedErrors);
  }

  // Handle JWT Authentication Errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Invalid or expired authentication token', 401, 'UNAUTHORIZED');
  }

  // Handle Syntax Errors (e.g. malformed JSON body)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return errorResponse(res, 'Malformed JSON payload', 400, 'BAD_REQUEST');
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  const code = err.code || 'INTERNAL_ERROR';

  const details = config.nodeEnv === 'development' ? err.stack : undefined;

  return errorResponse(res, message, statusCode, code, details);
};
