import { Router } from 'express';
import { LessonController } from '../controllers/lessonController.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = Router();

router.get('/modules', LessonController.getModules);
router.get('/', optionalAuth, LessonController.getLessons);
router.get('/:slug', optionalAuth, LessonController.getLessonBySlug);
router.post('/:id/complete', authenticate, LessonController.markLessonComplete);

export default router;
