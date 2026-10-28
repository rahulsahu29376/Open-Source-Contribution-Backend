import { Router } from 'express';
import { AiController } from '../controllers/aiController.js';
import { validateBody } from '../middleware/validation.js';
import {
  aiExplainCommandSchema,
  aiExplainErrorSchema,
  aiLearningPlanSchema,
} from '../validators/contentValidator.js';

const router = Router();

router.post('/explain-command', validateBody(aiExplainCommandSchema), AiController.explainCommand);
router.post('/explain-error', validateBody(aiExplainErrorSchema), AiController.explainError);
router.post('/learning-plan', validateBody(aiLearningPlanSchema), AiController.generateLearningPlan);

export default router;
