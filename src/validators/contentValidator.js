import { z } from 'zod';

export const quizAttemptSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string().min(1),
      answer: z.any(),
    })
  ).min(1, 'At least one answer must be provided'),
});

export const bookmarkSchema = z.object({
  resourceType: z.enum(['lesson', 'project', 'guide', 'issue']),
  resourceId: z.string().min(1),
  title: z.string().min(1).max(255),
  metadata: z.record(z.any()).optional().default({}),
});

export const savedProjectSchema = z.object({
  repositoryFullName: z.string().min(1).max(255),
  repositoryUrl: z.string().url('Must be a valid repository URL'),
  notes: z.string().max(1000).optional().nullable(),
  metadata: z.record(z.any()).optional().default({}),
});

export const contributionProgressSchema = z.object({
  repositoryUrl: z.string().url('Must be a valid repository URL'),
  issueUrl: z.string().url('Must be a valid issue URL').optional().nullable(),
  pullRequestUrl: z.string().url('Must be a valid pull request URL').optional().nullable(),
  status: z.enum(['planned', 'in_progress', 'submitted', 'under_review', 'merged', 'closed']).default('planned'),
  notes: z.string().max(2000).optional().nullable(),
});

export const updateContributionSchema = z.object({
  status: z.enum(['planned', 'in_progress', 'submitted', 'under_review', 'merged', 'closed']).optional(),
  pullRequestUrl: z.string().url('Must be a valid pull request URL').optional().nullable(),
  issueUrl: z.string().url('Must be a valid issue URL').optional().nullable(),
  notes: z.string().max(2000).optional().nullable(),
});

export const challengeAttemptSchema = z.object({
  completedCommands: z.array(z.string()).optional(),
  finalRepoState: z.record(z.any()).optional(),
});

export const aiExplainCommandSchema = z.object({
  command: z.string().min(1).max(255),
  context: z.string().max(1000).optional(),
});

export const aiExplainErrorSchema = z.object({
  errorMessage: z.string().min(1).max(2000),
  context: z.string().max(1000).optional(),
});

export const aiLearningPlanSchema = z.object({
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  targetLanguage: z.string().max(50).default('JavaScript'),
  weeklyHours: z.number().min(1).max(40).default(5),
});
