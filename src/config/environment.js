import dotenv from 'dotenv';
dotenv.config();

const requiredEnv = ['JWT_SECRET'];
for (const envName of requiredEnv) {
  if (!process.env[envName] && process.env.NODE_ENV === 'production') {
    throw new Error(`CRITICAL CONFIG ERROR: Environment variable ${envName} must be defined in production.`);
  }
}

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET || 'dev-fallback-secret-key-32-chars-long-minimum',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  supabase: {
    url: process.env.SUPABASE_URL || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
  },
  github: {
    token: process.env.GITHUB_TOKEN || '',
  },
  ai: {
    provider: process.env.AI_PROVIDER || 'mock',
    apiKey: process.env.AI_API_KEY || '',
  },
};
