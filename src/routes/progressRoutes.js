import { Router } from 'express';
import { ProgressController } from '../controllers/progressController.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = Router();

router.get('/achievements', optionalAuth, ProgressController.getAchievements);
router.get('/summary', authenticate, ProgressController.getSummary);
router.get('/activity', authenticate, ProgressController.getRecentActivity);
router.post('/wizard-complete', authenticate, ProgressController.completeWizard);

export default router;
