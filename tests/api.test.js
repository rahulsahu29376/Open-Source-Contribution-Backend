import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Open-Source Beginner Guide - Backend API Suite', () => {
  it('GET /api/health should return 200 and healthy status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toContain('Open-Source');
  });

  it('GET /api/lessons should return list of lessons', async () => {
    const res = await request(app).get('/api/lessons');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data.lessons)).toBe(true);
    expect(res.body.data.lessons.length).toBeGreaterThan(0);
  });

  it('GET /api/lessons/modules should return 7 modules', async () => {
    const res = await request(app).get('/api/lessons/modules');
    expect(res.status).toBe(200);
    expect(res.body.data.modules.length).toBe(7);
  });

  it('GET /api/lessons/what-is-open-source should return single lesson details', async () => {
    const res = await request(app).get('/api/lessons/what-is-open-source');
    expect(res.status).toBe(200);
    expect(res.body.data.lesson.title).toContain('Open Source');
  });

  it('GET /api/quizzes/:id should NOT reveal correct_answer before submission', async () => {
    const res = await request(app).get('/api/quizzes/quiz-1');
    expect(res.status).toBe(200);
    expect(res.body.data.quiz.questions.length).toBeGreaterThan(0);
    for (const q of res.body.data.quiz.questions) {
      expect(q).not.toHaveProperty('correctAnswer');
      expect(q).not.toHaveProperty('correct_answer');
    }
  });

  it('POST /api/auth/register should validate registration input', async () => {
    const invalidRes = await request(app).post('/api/auth/register').send({
      email: 'not-an-email',
      password: '123', // too short
    });
    expect(invalidRes.status).toBe(400);
    expect(invalidRes.body.error.code).toBe('VALIDATION_ERROR');
  });

  let authToken = null;
  const testEmail = `tester-${Date.now()}@example.com`;

  it('POST /api/auth/register and POST /api/auth/login should complete authentication lifecycle', async () => {
    // 1. Register
    const regRes = await request(app).post('/api/auth/register').send({
      fullName: 'Test Contributor',
      email: testEmail,
      password: 'SecurePassword123!',
      experienceLevel: 'beginner',
      preferredLanguages: ['JavaScript', 'Python'],
    });

    expect(regRes.status).toBe(201);
    expect(regRes.body.data.token).toBeDefined();
    expect(regRes.body.data.user.email).toBe(testEmail);
    expect(regRes.body.data.user).not.toHaveProperty('passwordHash');
    expect(regRes.body.data.user).not.toHaveProperty('password_hash');

    // 2. Login
    const loginRes = await request(app).post('/api/auth/login').send({
      email: testEmail,
      password: 'SecurePassword123!',
    });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body.data.token).toBeDefined();
    authToken = loginRes.body.data.token;
  });

  it('GET /api/auth/me should return current user profile with valid token', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.user.email).toBe(testEmail);
  });

  it('GET /api/bookmarks should reject unauthenticated requests with 401', async () => {
    const res = await request(app).get('/api/bookmarks');
    expect(res.status).toBe(401);
  });

  it('POST /api/ai/explain-command should return structured explanation for git status', async () => {
    const res = await request(app).post('/api/ai/explain-command').send({
      command: 'git status',
    });

    expect(res.status).toBe(200);
    expect(res.body.data.command).toBe('git status');
    expect(res.body.data.explanation).toContain('Inspects');
  });

  it('POST /api/playground/challenges/ch-1/attempt should validate challenge requirements', async () => {
    const res = await request(app)
      .post('/api/playground/challenges/ch-1/attempt')
      .send({
        finalRepoState: { initialized: true },
      });

    expect(res.status).toBe(200);
    expect(res.body.data.passed).toBe(true);
  });
});
