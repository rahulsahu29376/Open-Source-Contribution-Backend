import { Router } from 'express';
import { GithubController } from '../controllers/githubController.js';

const router = Router();

router.get('/repositories', GithubController.searchRepositories);
router.get('/issues', GithubController.searchIssues);
router.get('/repositories/:owner/:repo/contributing', GithubController.getContributingGuide);

export default router;
