import { Router } from 'express';
import { ContentController } from '../controllers/content.controller';

const router = Router();

router.get('/', ContentController.getContent);
router.post('/update', ContentController.updateContent);

export default router;
