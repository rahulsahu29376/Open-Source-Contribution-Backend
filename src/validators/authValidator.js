import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  githubUsername: z.string().max(39).optional().nullable(),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  preferredLanguages: z.array(z.string()).default([]),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const updateProfileSchema = z.object({
  fullName: z.string().min(2).max(100).optional(),
  githubUsername: z.string().max(39).optional().nullable(),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  preferredLanguages: z.array(z.string()).optional(),
  bio: z.string().max(300).optional().nullable(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
});
