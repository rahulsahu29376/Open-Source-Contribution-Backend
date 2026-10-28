import { Router } from 'express';
import { BookmarkController } from '../controllers/bookmarkController.js';
import { authenticate } from '../middleware/auth.js';
import { validateBody } from '../middleware/validation.js';
import { bookmarkSchema } from '../validators/contentValidator.js';

const router = Router();

router.use(authenticate);

router.get('/', BookmarkController.getBookmarks);
router.post('/', validateBody(bookmarkSchema), BookmarkController.createBookmark);
router.delete('/:id', BookmarkController.deleteBookmark);

export default router;
