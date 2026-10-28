import { Router } from 'express';
import { PlaygroundController } from '../controllers/playgroundController.js';
import { optionalAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validation.js';
import { challengeAttemptSchema } from '../validators/contentValidator.js';

const router = Router();

router.get('/challenges', PlaygroundController.getChallenges);
router.get('/challenges/:id', PlaygroundController.getChallengeById);
router.post('/challenges/:id/attempt', optionalAuth, validateBody(challengeAttemptSchema), PlaygroundController.attemptChallenge);

export default router;
