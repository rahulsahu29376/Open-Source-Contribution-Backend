import app from './app.js';
import { config } from './config/environment.js';

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Open-Source Beginner Guide API Server`);
  console.log(` Running on port: ${PORT}`);
  console.log(` Environment: ${config.nodeEnv}`);
  console.log(` API Base: http://localhost:${PORT}/api`);
  console.log(`====================================================`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection at:', promise, 'reason:', reason);
});
