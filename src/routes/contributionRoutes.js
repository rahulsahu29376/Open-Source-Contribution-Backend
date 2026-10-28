import { Router } from 'express';
import { ContributionController } from '../controllers/contributionController.js';
import { authenticate } from '../middleware/auth.js';
import { validateBody } from '../middleware/validation.js';
import { contributionProgressSchema, updateContributionSchema } from '../validators/contentValidator.js';

const router = Router();

router.use(authenticate);

router.get('/', ContributionController.getContributions);
router.post('/', validateBody(contributionProgressSchema), ContributionController.logContribution);
router.patch('/:id', validateBody(updateContributionSchema), ContributionController.updateContribution);
router.delete('/:id', ContributionController.deleteContribution);

export default router;
