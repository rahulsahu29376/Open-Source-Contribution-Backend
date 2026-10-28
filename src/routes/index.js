import { Router } from 'express';
import authRoutes from './authRoutes.js';
import lessonRoutes from './lessonRoutes.js';
import quizRoutes from './quizRoutes.js';
import playgroundRoutes from './playgroundRoutes.js';
import githubRoutes from './githubRoutes.js';
import bookmarkRoutes from './bookmarkRoutes.js';
import projectRoutes from './projectRoutes.js';
import contributionRoutes from './contributionRoutes.js';
import progressRoutes from './progressRoutes.js';
import aiRoutes from './aiRoutes.js';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/lessons', lessonRoutes);
apiRouter.use('/quizzes', quizRoutes);
apiRouter.use('/playground', playgroundRoutes);
apiRouter.use('/github', githubRoutes);
apiRouter.use('/bookmarks', bookmarkRoutes);
apiRouter.use('/projects', projectRoutes);
apiRouter.use('/contributions', contributionRoutes);
apiRouter.use('/progress', progressRoutes);
apiRouter.use('/ai', aiRoutes);

// Health check endpoint
apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Open-Source Beginner Guide API',
  });
});

export default apiRouter;
