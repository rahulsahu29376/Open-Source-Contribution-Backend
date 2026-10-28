/**
 * Standardized API Response Utilities
 */

export const successResponse = (res, data = {}, message = 'Operation completed successfully', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  });
};

export const errorResponse = (res, message = 'An unexpected error occurred', statusCode = 500, code = 'INTERNAL_ERROR', details = null) => {
  const payload = {
    success: false,
    message,
    error: {
      code,
      ...(details && { details }),
    },
  };
  return res.status(statusCode).json(payload);
};
