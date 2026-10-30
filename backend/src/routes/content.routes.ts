import { Router } from 'express';
import { ContentController } from '../controllers/content.controller';

const router = Router();

router.get('/', ContentController.getContent);
router.post('/update', ContentController.updateContent);
router.post('/batch', ContentController.batchUpdate);

export default router;
