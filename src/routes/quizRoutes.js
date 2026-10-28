import { Router } from 'express';
import { QuizController } from '../controllers/quizController.js';
import { authenticate } from '../middleware/auth.js';
import { validateBody } from '../middleware/validation.js';
import { quizAttemptSchema } from '../validators/contentValidator.js';

const router = Router();

router.get('/', QuizController.getQuizzes);
router.get('/:id', QuizController.getQuizById);
router.post('/:id/attempts', authenticate, validateBody(quizAttemptSchema), QuizController.submitQuizAttempt);
router.get('/:id/attempts', authenticate, QuizController.getQuizAttempts);

export default router;
