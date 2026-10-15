import { Router } from 'express';
import { BlogsController } from '../controllers/blogs.controller';

const router = Router();

router.get('/', BlogsController.getAll);
router.get('/:slug', BlogsController.getBySlug);
router.post('/save', BlogsController.save);
router.delete('/:id', BlogsController.delete);

export default router;
