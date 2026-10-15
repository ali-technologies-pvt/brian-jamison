import { Router } from 'express';
import { FormsController } from '../controllers/forms.controller';

const router = Router();

// Public submission endpoint
router.post('/submit', FormsController.submit);

// Admin query endpoints
router.get('/', FormsController.getAll);
router.patch('/:id', FormsController.markRead);
router.delete('/:id', FormsController.delete);

export default router;
