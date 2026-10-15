import { Router } from 'express';
import authRoutes from './auth.routes';
import contentRoutes from './content.routes';
import formsRoutes from './forms.routes';
import blogsRoutes from './blogs.routes';
import usersRoutes from './users.routes';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'brian-jamison-backend-api',
    features: ['content-cms', 'blog-engine', 'forms-inbox', 'user-management', 'auth'],
    timestamp: new Date().toISOString(),
  });
});

// Mount domain routes
router.use('/auth', authRoutes);
router.use('/content', contentRoutes);
router.use('/forms', formsRoutes);
router.use('/blogs', blogsRoutes);
router.use('/users', usersRoutes);

export default router;
