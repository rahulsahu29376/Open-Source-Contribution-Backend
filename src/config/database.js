import { createClient } from '@supabase/supabase-js';
import { config } from './environment.js';
import { LESSONS, QUIZZES, ACHIEVEMENTS, PLAYGROUND_CHALLENGES } from '../constants/curriculumData.js';

// Check if Supabase credentials are validly supplied
const hasSupabaseConfig = Boolean(
  config.supabase.url &&
  config.supabase.serviceRoleKey &&
  config.supabase.url.startsWith('http') &&
  !config.supabase.url.includes('your-project-id')
);

export let supabase = null;
export let isUsingSupabase = false;

if (hasSupabaseConfig) {
  try {
    supabase = createClient(config.supabase.url, config.supabase.serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
    isUsingSupabase = true;
    console.log('Connected to Supabase PostgreSQL database.');
  } catch (err) {
    console.warn('Failed to initialize Supabase client, falling back to local store:', err.message);
  }
} else {
  console.log('Supabase credentials not set or placeholder detected. Running with built-in high-performance local store.');
}

/**
 * Resilient In-Memory Data Store for local development & fallback
 */
class MemoryStore {
  constructor() {
    this.users = new Map(); // id -> user
    this.lessons = new Map(LESSONS.map((l) => [l.id, { ...l }]));
    this.quizzes = new Map(QUIZZES.map((q) => [q.id, { ...q }]));
    this.achievements = new Map(ACHIEVEMENTS.map((a) => [a.id, { ...a }]));
    this.challenges = new Map(PLAYGROUND_CHALLENGES.map((c) => [c.id, { ...c }]));

    this.lessonProgress = new Map(); // `${userId}:${lessonId}` -> record
    this.quizAttempts = new Map(); // id -> attempt
    this.bookmarks = new Map(); // id -> bookmark
    this.savedProjects = new Map(); // id -> savedProject
    this.contributions = new Map(); // id -> contribution
    this.userAchievements = new Map(); // `${userId}:${achievementId}` -> record
    this.activities = []; // Array of user activity items
  }

  // Helper to generate UUID-like IDs
  generateId(prefix = 'rec') {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
  }
}

export const memoryStore = new MemoryStore();
