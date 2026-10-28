import jwt from 'jsonwebtoken';
import { config } from '../config/environment.js';
import { errorResponse } from '../utils/response.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return errorResponse(res, 'Authentication token missing or invalid format', 401, 'UNAUTHORIZED');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // { id, email, role }
    next();
  } catch (err) {
    return errorResponse(res, 'Invalid or expired session token', 401, 'TOKEN_INVALID');
  }
};

export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      req.user = decoded;
    } catch {
      // Ignore invalid token for optional auth, treat as visitor
      req.user = null;
    }
  } else {
    req.user = null;
  }
  next();
};

export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Authentication required', 401, 'UNAUTHORIZED');
    }
    if (req.user.role !== role) {
      return errorResponse(res, 'Forbidden: Insufficient privileges for this action', 403, 'FORBIDDEN');
    }
    next();
  };
};
