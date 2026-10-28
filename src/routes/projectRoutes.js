import { Router } from 'express';
import { ProjectController } from '../controllers/projectController.js';
import { authenticate } from '../middleware/auth.js';
import { validateBody } from '../middleware/validation.js';
import { savedProjectSchema } from '../validators/contentValidator.js';

const router = Router();

router.use(authenticate);

router.get('/saved', ProjectController.getSavedProjects);
router.post('/saved', validateBody(savedProjectSchema), ProjectController.saveProject);
router.delete('/saved/:id', ProjectController.deleteSavedProject);

export default router;
